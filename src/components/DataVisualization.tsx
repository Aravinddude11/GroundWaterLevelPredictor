import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { waterLevelApi } from '../services/api';
import { useWaterLevelStore } from '../store/waterLevelStore';
import { ErrorBoundary } from './ErrorBoundary';

export default function DataVisualization() {
  const { historicalData, currentPrediction, setHistoricalData } = useWaterLevelStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const data = await waterLevelApi.getHistoricalData('28.6139,77.2090');
        setHistoricalData(data);
      } catch (err) {
        setError('Failed to fetch historical data');
        setHistoricalData([]);
      }
    };

    fetchData();
  }, [setHistoricalData]);

  const chartData = historicalData.map(data => ({
    month: data.date,
    level: Number(data.level.toFixed(2)),
  }));

  if (currentPrediction) {
    chartData.push({
      month: 'Predicted',
      level: Number(currentPrediction.predictedLevel.toFixed(2)),
    });
  }

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Water Level Trends</h2>
        {error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        ) : (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  label={{ value: 'Water Level (m)', angle: -90, position: 'insideLeft' }}
                  domain={['auto', 'auto']}
                />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {currentPrediction && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Prediction Results</h3>
            <p className="text-blue-600">
              Predicted Water Level: {currentPrediction.predictedLevel.toFixed(2)}m
              <br />
              Confidence: {(currentPrediction.confidence * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}