import * as tf from '@tensorflow/tfjs-node';
import { WaterLevel } from '../models/waterLevel.js';
import mongoose from 'mongoose';

async function trainModel() {
  try {
    await mongoose.connect('mongodb://localhost:27017/groundwater');
    console.log('Connected to MongoDB');

    // Fetch training data
    const data = await WaterLevel.find({});
    
    // Prepare features and labels
    const features = data.map(entry => [
      (entry.location.latitude - 28.6139) / 10,
      (entry.location.longitude - 77.2090) / 10,
      entry.factors.rainfall / 2000,
      entry.factors.population / 1000,
      entry.factors.elevation / 1000,
      new Date(entry.date).getMonth() / 12,
      entry.factors.landUse === 'Agricultural' ? 1 : 0,
      entry.factors.landUse === 'Urban' ? 1 : 0,
      entry.factors.landUse === 'Forest' ? 1 : 0,
      entry.factors.landUse === 'Industrial' ? 1 : 0
    ]);

    const labels = data.map(entry => entry.level / 100);

    // Create and compile model
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 1 })
      ]
    });

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    // Train model
    await model.fit(
      tf.tensor2d(features),
      tf.tensor2d(labels, [labels.length, 1]),
      {
        epochs: 100,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}`);
          }
        }
      }
    );

    // Save model
    await model.save('file://server/ml/model');
    console.log('Model trained and saved successfully');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error training model:', error);
    process.exit(1);
  }
}

trainModel();