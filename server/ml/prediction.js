import * as tf from '@tensorflow/tfjs-node';

// Normalize input features
function normalizeFeatures(input) {
  const normalized = {
    latitude: (input.location.latitude - 28.6139) / 10,
    longitude: (input.location.longitude - 77.2090) / 10,
    rainfall: input.factors.rainfall / 2000,
    population: input.factors.population / 1000,
    elevation: input.factors.elevation / 1000,
    month: new Date(input.date).getMonth() / 12
  };

  // Convert land use to one-hot encoding
  const landUseMap = {
    'Agricultural': [1, 0, 0, 0],
    'Urban': [0, 1, 0, 0],
    'Forest': [0, 0, 1, 0],
    'Industrial': [0, 0, 0, 1]
  };

  return [...Object.values(normalized), ...landUseMap[input.factors.landUse]];
}

export async function predictWaterLevel(model, input) {
  try {
    // Normalize input features
    const normalizedFeatures = normalizeFeatures(input);
    
    // Convert to tensor
    const inputTensor = tf.tensor2d([normalizedFeatures]);
    
    // Make prediction
    const prediction = await model.predict(inputTensor);
    const predictedLevel = prediction.dataSync()[0] * 100; // Denormalize
    
    // Calculate confidence based on input quality
    const confidence = calculateConfidence(input.factors);
    
    return {
      predictedLevel: Number(predictedLevel.toFixed(2)),
      confidence,
      factors: input.factors
    };
  } catch (error) {
    throw new Error(`Prediction failed: ${error.message}`);
  }
}

function calculateConfidence(factors) {
  const weights = {
    rainfall: 0.3,
    population: 0.2,
    elevation: 0.3,
    landUse: 0.2
  };

  let confidence = 0;
  
  // Check data quality for each factor
  if (factors.rainfall > 0) confidence += weights.rainfall;
  if (factors.population > 0) confidence += weights.population;
  if (factors.elevation > 0) confidence += weights.elevation;
  if (factors.landUse) confidence += weights.landUse;

  return Number(confidence.toFixed(2));
}