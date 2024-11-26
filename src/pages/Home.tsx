import React from 'react';
import Dashboard from '../components/Dashboard';
import PredictionForm from '../components/PredictionForm';
import DataVisualization from '../components/DataVisualization';
import FactorsPanel from '../components/FactorsPanel';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Dashboard />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PredictionForm />
        </div>
        
        <div className="lg:col-span-2">
          <DataVisualization />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Impact Factors</h2>
        <FactorsPanel />
      </div>
    </main>
  );
}