import mongoose from 'mongoose';
import { WaterLevel } from '../models/waterLevel.js';

const sampleData = Array.from({ length: 12 }, (_, i) => ({
  location: {
    latitude: 28.6139,
    longitude: 77.2090,
    name: 'New Delhi'
  },
  date: `2023-${String(i + 1).padStart(2, '0')}`,
  level: 35 + Math.sin(i / 12 * Math.PI * 2) * 5 + Math.random() * 2,
  factors: {
    rainfall: 750 + Math.random() * 500,
    population: 450 + Math.random() * 100,
    elevation: 450 + Math.random() * 50,
    landUse: 'Agricultural'
  }
}));

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/groundwater');
    console.log('Connected to MongoDB');

    // Clear existing data
    await WaterLevel.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await WaterLevel.insertMany(sampleData);
    console.log('Sample data inserted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();