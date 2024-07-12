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

app.get('/api/markets/:description', async (req, res) => {
  const description = req.params.description;
  try {
    const market = await Market.findOne({ description });
    if (market) {
      res.json(market);
    } else {
      res.status(404).json({ message: 'Market not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/data', async (req, res) => {
  const { description, numOptions, options } = req.body;
  console.log('Received request:', req.body);

  const newMarket = new Market({ description, numOptions, options });

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

    // Replace dots with underscores in the email
    const safeEmail = email.replace(/\./g, '_');

    // Update the market with the bet
    const betDetails = { amount: ethAmount, option, walletAddress };
    market.bets.set(safeEmail, betDetails);
    await market.save();

    // Update the user with the bet
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
