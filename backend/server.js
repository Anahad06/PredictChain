const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Market = require('./models/Market'); 

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
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

app.post('/api/data', async (req, res) => {
  const { Description, numOptions, Options } = req.body;
  console.log('Received request:', req.body); 

  const newMarket = new Market({ Description, numOptions, Options });

  try {
    const savedMarket = await newMarket.save();
    res.json(savedMarket); 
  } catch (err) {
    console.error('Error saving data:', err); 
    res.status(500).json({ error: 'Error saving data' }); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
