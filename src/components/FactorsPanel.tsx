import React from 'react';
import { Cloud, Users, Mountain, TreePine } from 'lucide-react';
import { useWaterLevelStore } from '../store/waterLevelStore';

const LAND_USE_OPTIONS = ['Agricultural', 'Urban', 'Forest', 'Industrial'];

export default function FactorsPanel() {
  const { factors, setFactors } = useWaterLevelStore();

  const handleFactorChange = (key: keyof typeof factors, value: string | number) => {
    setFactors({ ...factors, [key]: value });
  };

  const factorInputs = [
    { 
      icon: Cloud, 
      title: 'Annual Rainfall', 
      value: factors.rainfall,
      unit: 'mm/year',
      key: 'rainfall' as const,
      min: 0,
      max: 2000,
    },
    { 
      icon: Users, 
      title: 'Population Density', 
      value: factors.population,
      unit: '/km²',
      key: 'population' as const,
      min: 0,
      max: 1000,
    },
    { 
      icon: Mountain, 
      title: 'Surface Elevation', 
      value: factors.elevation,
      unit: 'm',
      key: 'elevation' as const,
      min: 0,
      max: 1000,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {factorInputs.map((Factor) => (
        <div key={Factor.key} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Factor.icon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{Factor.title}</h3>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  value={Factor.value}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= Factor.min && value <= Factor.max) {
                      handleFactorChange(Factor.key, value);
                    }
                  }}
                  min={Factor.min}
                  max={Factor.max}
                  className="block w-full pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{Factor.unit}</span>
                </div>
              </div>
            </div>
          </div>
          <input
            type="range"
            min={Factor.min}
            max={Factor.max}
            value={Factor.value}
            onChange={(e) => handleFactorChange(Factor.key, Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      ))}

      {/* Land Use Selector */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <TreePine className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Land Use</h3>
            <select
              value={factors.landUse}
              onChange={(e) => handleFactorChange('landUse', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {LAND_USE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}