import React from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { useWaterLevelStore } from '../store/waterLevelStore';

export default function Settings() {
  const { factors, setFactors } = useWaterLevelStore();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleReset = () => {
    setFactors({
      rainfall: 750,
      population: 450,
      elevation: 450,
      landUse: 'Agricultural'
    });
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('defaultFactors', JSON.stringify(factors));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Default Impact Factors</h3>
            <p className="text-gray-600 mb-4">
              Configure the default values for impact factors used in predictions.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Default Rainfall (mm/year)</label>
                <input
                  type="number"
                  value={factors.rainfall}
                  onChange={(e) => setFactors({ ...factors, rainfall: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Default Population Density (/km²)</label>
                <input
                  type="number"
                  value={factors.population}
                  onChange={(e) => setFactors({ ...factors, population: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Default Elevation (m)</label>
                <input
                  type="number"
                  value={factors.elevation}
                  onChange={(e) => setFactors({ ...factors, elevation: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Default Land Use</label>
                <select
                  value={factors.landUse}
                  onChange={(e) => setFactors({ ...factors, landUse: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Agricultural">Agricultural</option>
                  <option value="Urban">Urban</option>
                  <option value="Forest">Forest</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>

          {showSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">Settings saved successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}