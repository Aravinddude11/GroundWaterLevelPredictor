import { PredictionRequest, PredictionResponse, WaterLevelData } from '../types';
import { getHistoricalData } from './db';
import { predictWaterLevel } from './prediction';
import { initDB } from './db';
import { initModel } from './prediction';

// Initialize the database and ML model
initDB().catch(console.error);
initModel().catch(console.error);

export const waterLevelApi = {
  getHistoricalData: async (location: string): Promise<WaterLevelData[]> => {
    const [lat, lng] = location.split(',').map(Number);
    return getHistoricalData(lat, lng);
  },

  predictWaterLevel: async (request: PredictionRequest): Promise<PredictionResponse> => {
    return predictWaterLevel(request);
  },
};