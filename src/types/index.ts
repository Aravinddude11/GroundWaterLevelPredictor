export interface WaterLevelData {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  date: string;
  level: number;
}

export interface PredictionFactors {
  rainfall: number;
  population: number;
  elevation: number;
  landUse: string;
}

export interface PredictionRequest {
  location: {
    latitude: number;
    longitude: number;
  };
  date: string;
  factors: PredictionFactors;
}

export interface PredictionResponse {
  predictedLevel: number;
  confidence: number;
  factors: PredictionFactors;
}