import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as tf from '@tensorflow/tfjs-node';
import { predictWaterLevel } from './ml/prediction.js';
import { WaterLevel } from './models/waterLevel.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/groundwater')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Load pre-trained model
let model;
async function loadModel() {
  try {
    model = await tf.loadLayersModel('file://server/ml/model/model.json');
    console.log('ML model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
}
loadModel();

// Get historical data
app.get('/api/historical/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const data = await WaterLevel.find({
      'location.latitude': { $near: parseFloat(lat) },
      'location.longitude': { $near: parseFloat(lng) }
    }).limit(12);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Predict water level
app.post('/api/predict', async (req, res) => {
  try {
    const { location, factors, date } = req.body;
    const prediction = await predictWaterLevel(model, {
      location,
      factors,
      date
    });
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});