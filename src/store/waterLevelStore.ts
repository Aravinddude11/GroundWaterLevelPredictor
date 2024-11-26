import { create } from 'zustand';
import { PredictionFactors, WaterLevelData, PredictionResponse } from '../types';

interface WaterLevelStore {
  historicalData: WaterLevelData[];
  currentPrediction: PredictionResponse | null;
  factors: PredictionFactors;
  setHistoricalData: (data: WaterLevelData[]) => void;
  setPrediction: (prediction: PredictionResponse) => void;
  setFactors: (factors: PredictionFactors) => void;
}

export const useWaterLevelStore = create<WaterLevelStore>((set) => ({
  historicalData: [],
  currentPrediction: null,
  factors: {
    rainfall: 750,
    population: 450,
    elevation: 450,
    landUse: 'Agricultural',
  },
  setHistoricalData: (data) => set({ historicalData: data }),
  setPrediction: (prediction) => set({ currentPrediction: prediction }),
  setFactors: (factors) => set({ factors }),
}));