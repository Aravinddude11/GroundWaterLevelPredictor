import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

export async function initModel() {
  model = tf.sequential({
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

  await trainModel();
}

async function trainModel() {
  if (!model) return;

  const features = [];
  const labels = [];

  // Generate more diverse training data
  for (let lat = 25; lat <= 35; lat += 0.5) {
    for (let lng = 70; lng <= 85; lng += 0.5) {
      const feature = [
        (lat - 28.6139) / 10,
        (lng - 77.2090) / 10,
        Math.random(), // rainfall
        Math.random(), // population
        Math.random(), // elevation
        Math.random(), // month
        Math.random() > 0.5 ? 1 : 0, // Agricultural
        Math.random() > 0.5 ? 1 : 0, // Urban
        Math.random() > 0.5 ? 1 : 0, // Forest
        Math.random() > 0.5 ? 1 : 0  // Industrial
      ];
      
      // More realistic label calculation
      const baseLevel = 35 + (lat - 28.6139) * 0.5 + (lng - 77.2090) * 0.3;
      const seasonalEffect = Math.sin(feature[5] * Math.PI * 2) * 5;
      const rainfallEffect = feature[2] * 10;
      const populationEffect = -feature[3] * 3;
      const elevationEffect = feature[4] * 2;
      
      const label = baseLevel + seasonalEffect + rainfallEffect + populationEffect + elevationEffect;
      
      features.push(feature);
      labels.push([label]);
    }
  }

  await model.fit(
    tf.tensor2d(features),
    tf.tensor2d(labels),
    {
      epochs: 50,
      validationSplit: 0.2,
      shuffle: true
    }
  );
}

export async function predictWaterLevel(input: any) {
  if (!model) {
    await initModel();
  }

  const features = normalizeFeatures(input);
  const prediction = model!.predict(tf.tensor2d([features])) as tf.Tensor;
  const predictedLevel = prediction.dataSync()[0];
  
  return {
    predictedLevel: Number(predictedLevel.toFixed(2)),
    confidence: calculateConfidence(input.factors),
    factors: input.factors
  };
}

function normalizeFeatures(input: any) {
  const normalized = [
    (input.location.latitude - 28.6139) / 10,
    (input.location.longitude - 77.2090) / 10,
    input.factors.rainfall / 2000,
    input.factors.population / 1000,
    input.factors.elevation / 1000,
    new Date(input.date).getMonth() / 12
  ];

  const landUseMap: { [key: string]: number[] } = {
    'Agricultural': [1, 0, 0, 0],
    'Urban': [0, 1, 0, 0],
    'Forest': [0, 0, 1, 0],
    'Industrial': [0, 0, 0, 1]
  };

  return [...normalized, ...landUseMap[input.factors.landUse]];
}

function calculateConfidence(factors: any) {
  const weights = {
    rainfall: 0.3,
    population: 0.2,
    elevation: 0.3,
    landUse: 0.2
  };

  let confidence = 0;
  if (factors.rainfall > 0) confidence += weights.rainfall;
  if (factors.population > 0) confidence += weights.population;
  if (factors.elevation > 0) confidence += weights.elevation;
  if (factors.landUse) confidence += weights.landUse;

  return Number(confidence.toFixed(2));
}