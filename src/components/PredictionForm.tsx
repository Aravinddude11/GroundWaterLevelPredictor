import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Droplets } from 'lucide-react';
import { waterLevelApi } from '../services/api';
import { useWaterLevelStore } from '../store/waterLevelStore';
import LocationPicker from './LocationPicker';
import { format } from 'date-fns';
import { ErrorBoundary } from './ErrorBoundary';

export default function PredictionForm() {
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { factors, setPrediction, setHistoricalData } = useWaterLevelStore();

  const updateData = async (newLocation: { lat: number; lng: number }) => {
    try {
      setError(null);
      setLoading(true);
      const data = await waterLevelApi.getHistoricalData(`${newLocation.lat},${newLocation.lng}`);
      setHistoricalData(data);
      
      // Update prediction for new location
      const prediction = await waterLevelApi.predictWaterLevel({
        location: { latitude: newLocation.lat, longitude: newLocation.lng },
        date,
        factors,
      });
      setPrediction(prediction);
    } catch (err) {
      setError('Failed to fetch data for this location. Please try again.');
      setHistoricalData([]);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  // Update data when location changes
  useEffect(() => {
    updateData(location);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateData(location);
  };

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Droplets className="text-blue-600" />
          Predict Water Levels
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                Select Location
              </div>
            </label>
            <LocationPicker value={location} onChange={setLocation} />
            <div className="mt-2 text-sm text-gray-500">
              Selected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                Prediction Date
              </div>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Droplets className="h-5 w-5" />
            {loading ? 'Calculating...' : 'Predict Water Level'}
          </button>
        </form>
      </div>
    </ErrorBoundary>
  );
}