const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Market = require('./models/Market');
const User = require('./models/User');
const authRoutes = require('./auth');
const auth = require('./middleware/auth');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use('/api', authRoutes);

app.post('/api/signup', async (req, res) => {
  const { username, email, password, confirmPassword, walletAddress } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      walletAddress
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

app.get('/api/account', auth, async (req, res) => {
  try {
    console.log('Fetching user with ID:', req.user.userId);
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/ret-data', async (req, res) => {
  try {
    const retrieveData = await Market.find();
    res.json(retrieveData);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

app.get('/api/markets/description/:description', async (req, res) => {
  const description = req.params.description;
  try {
    const market = await Market.findOne({ description });

    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    const optionsWithBets = market.options.map(option => {
      const bets = Array.from(market.bets.values()).filter(bet => bet.option === option);
      return { name: option, bets };
    });

    res.json({
      description: market.description,
      numOptions: market.numOptions,
      options: optionsWithBets,
    });
  } catch (err) {
    console.error('Error retrieving market details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/getInfo', async (req, res) => {
  const { description, WinningOption, password } = req.body;
  
  try {
    let market = await Market.findOne({ description, password });

    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    if (market.resolved) {
      return res.status(400).json({ message: 'Market has already been resolved!' });
    }

    market.WinningOption = WinningOption;
    market.resolved = true;
    await market.save();

    let users = await User.find({ 'bets.market': description });

    for (let user of users) {
      let userWon = false;
      let totalWinnings = 0;

      for (let bet of user.bets) {
        if (bet.market === description && bet.option === WinningOption) {
          totalWinnings += bet.amount; 
          userWon = true;
        }
      }

      if (userWon) {
        user.ETH = (user.ETH || 0) + totalWinnings; 
        await user.save(); 
      }
    }

    res.status(200).json({ message: 'Market resolved and users updated successfully' });
    console.log("API Endpoint for Resolve is Working!");
  } catch (error) {
    console.error("Error with Resolve!", error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/data', async (req, res) => {
  const { description, numOptions, options, password} = req.body;
  console.log('Received request:', req.body);

  const newMarket = new Market({ description, numOptions, options, password });

  try {
    const savedMarket = await newMarket.save();
    res.json(savedMarket);
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Error saving data' });
  }
});

app.post('/api/place-bet', async (req, res) => {
  const { marketDescription, email, ethAmount, option, walletAddress } = req.body;

  try {
    const market = await Market.findOne({ description: marketDescription });
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    const safeEmail = email.replace(/\./g, '_');

    const betDetails = { amount: ethAmount, option, walletAddress };
    market.bets.set(safeEmail, betDetails);
    await market.save();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bets.push({ market: marketDescription, amount: ethAmount, option });
    await user.save();

    res.json({ message: 'Bet placed successfully' });
  } catch (err) {
    console.error('Error placing bet:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/markets/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const market = await Market.findById(id);

    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    const optionsWithBets = market.options.map(option => {
      const numBets = Array.from(market.bets.values()).filter(bet => bet.option === option).length;
      return { name: option, numBets };
    });

    res.json({
      description: market.description,
      numOptions: market.numOptions,
      options: optionsWithBets,
    });
  } catch (err) {
    console.error('Error retrieving market details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
