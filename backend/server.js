const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Market = require('./models/Market');
const User = require('./models/User');
const authRoutes = require('./auth');

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
<<<<<<< HEAD
=======
  const description = req.params.description;
  try {
    const market = await Market.findOne({ description });
    if (market) {
      res.json(market);
    } else {
      res.status(404).json({ message: 'Market not found' });
    }
  } catch (err) {
    console.error('Error fetching market data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/markets/:description', async (req, res) => {
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
  const description = req.params.description;
  try {
    const market = await Market.findOne({ description });

    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    // Calculate the number of bets per option
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
    let data = await Market.findOne({ description, password });

    if (data) {
      await Market.updateOne(
        { description, password },
        { $set: { WinningOption: WinningOption } }
      );
      res.status(200).json({ message: 'Market updated successfully', market: WinningOption });
      console.log("API Endpoint for Resolve is Working!");
    } else {
      res.status(404).json({ message: 'Market not found' });
    }
  } catch (error) {
    console.error("Error with Resolve!", error);
    res.status(500).json({ message: 'Server error' });
  }
});

<<<<<<< HEAD

app.post('/api/data', async (req, res) => {
  const { description, numOptions, options, password} = req.body;
  console.log('Received request:', req.body);

  const newMarket = new Market({ description, numOptions, options, password });

=======
app.get('/api/markets/:id', async (req, res) => {
  const id = req.params.id;
>>>>>>> d13a3b1d37b8146b5e9bfd174ab2a1c98e82417f
  try {
    const market = await Market.findById(id);
    if (market) {
      res.json(market);
    } else {
      res.status(404).json({ message: 'Market not found' });
    }
  } catch (err) {
    console.error('Error fetching market data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/resolve-market', authRoutes, async (req, res) => {
  const { description, password, winningOption } = req.body;

  try {
    const market = await Market.findOne({ description });
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    const isMatch = await bcrypt.compare(password, market.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    if (market.resolved) {
      return res.status(400).json({ message: 'Market is already resolved' });
    }

    market.resolved = true;
    market.winningOption = winningOption;

    const totalBetAmount = Object.values(market.bets).reduce((acc, bet) => acc + bet.amount, 0);
    const totalBetOnWinningOption = Object.values(market.bets).reduce((acc, bet) => {
      if (bet.option === winningOption) {
        acc += bet.amount;
      }
      return acc;
    }, 0);

    const winners = Object.entries(market.bets).filter(([email, bet]) => bet.option === winningOption);

    await Promise.all(winners.map(async ([email, bet]) => {
      const user = await User.findOne({ email: email.replace(/_/g, '.') });
      if (user) {
        const winningAmount = (bet.amount / totalBetOnWinningOption) * totalBetAmount;
        user.winnings = (user.winnings || 0) + winningAmount;
        await user.save();
      }
    }));

    market.description += ' - DISTRIBUTING!';
    await market.save();
    res.json({ message: 'Market resolved and bets distributed' });
  } catch (err) {
    console.error('Error resolving market:', err);
    res.status(500).json({ message: 'Server error' });
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

    user.bets.push({ market: marketDescription, amount: ethAmount , option });
    await user.save();

    res.json({ message: 'Bet placed successfully' });
  } catch (err) {
    console.error('Error placing bet:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch market by ID
app.get('/api/markets/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const market = await Market.findById(id);

    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    // Calculate the number of bets per option
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
