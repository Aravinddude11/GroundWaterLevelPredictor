import mongoose from 'mongoose';

const waterLevelSchema = new mongoose.Schema({
  location: {
    latitude: Number,
    longitude: Number,
    name: String
  },
  date: String,
  level: Number,
  factors: {
    rainfall: Number,
    population: Number,
    elevation: Number,
    landUse: String
  }
});

// Index for geospatial queries
waterLevelSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });

export const WaterLevel = mongoose.model('WaterLevel', waterLevelSchema);