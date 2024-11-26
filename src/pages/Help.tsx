import React from 'react';
import { HelpCircle, Map, Droplets, Settings, BarChart2 } from 'lucide-react';

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="text-blue-600" />
          Help & Documentation
        </h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
            <p className="text-gray-600 mb-4">
              The Ground Water Level Predictor helps you analyze and predict groundwater levels based on various environmental and demographic factors.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Quick Start Guide:</h4>
              <ol className="list-decimal list-inside space-y-2 text-blue-900">
                <li>Select a location on the map</li>
                <li>Choose a prediction date</li>
                <li>Adjust impact factors if needed</li>
                <li>Click "Predict Water Level" to see results</li>
              </ol>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Map className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Location Selection</h4>
                  <p className="text-gray-600">Use the interactive map to select any location for prediction.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Water Level Prediction</h4>
                  <p className="text-gray-600">Get accurate predictions based on historical data and environmental factors.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <BarChart2 className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Data Visualization</h4>
                  <p className="text-gray-600">View historical trends and predictions through interactive charts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Customizable Factors</h4>
                  <p className="text-gray-600">Adjust impact factors like rainfall, population, and land use for more accurate predictions.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">How accurate are the predictions?</h4>
                <p className="text-gray-600">Predictions are based on historical data and machine learning models, with accuracy levels displayed for each prediction.</p>
              </div>
              <div>
                <h4 className="font-semibold">Can I export the data?</h4>
                <p className="text-gray-600">Currently, data visualization is available through the dashboard. Export functionality will be added in future updates.</p>
              </div>
              <div>
                <h4 className="font-semibold">What factors affect the predictions?</h4>
                <p className="text-gray-600">Key factors include rainfall, population density, elevation, and land use patterns in the selected area.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}