import React from 'react';
import { BarChart2, Droplets, TrendingUp, Map, AlertTriangle, HelpCircle } from 'lucide-react';
import { useWaterLevelStore } from '../store/waterLevelStore';
import { WaterLevelData } from '../types';

export default function Dashboard() {
  const { historicalData, currentPrediction } = useWaterLevelStore();

  const getAverageLevel = (data: WaterLevelData[]) => {
    if (!data.length) return 0;
    return Number((data.reduce((acc, curr) => acc + curr.level, 0) / data.length).toFixed(2));
  };

  const getTrend = (data: WaterLevelData[]) => {
    if (data.length < 2) return 'neutral';
    const lastTwo = data.slice(-2);
    return lastTwo[1].level > lastTwo[0].level ? 'rising' : 'falling';
  };

  const getRiskLevel = (level: number) => {
    if (level > 35) return { status: 'High', color: 'text-red-800', bg: 'bg-red-100' };
    if (level > 30) return { status: 'Medium', color: 'text-yellow-800', bg: 'bg-yellow-100' };
    return { status: 'Low', color: 'text-green-800', bg: 'bg-green-100' };
  };

  const averageLevel = getAverageLevel(historicalData);
  const trend = getTrend(historicalData);
  const latestLevel = historicalData[historicalData.length - 1]?.level || 0;
  const riskLevel = getRiskLevel(latestLevel);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Current Level Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Droplets className="h-6 w-6 text-blue-600" />
          </div>
          <div className="group relative">
            <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-900 text-white text-sm rounded-md -left-28 top-8">
              Current depth of groundwater from surface. Lower depths indicate easier access to water.
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            trend === 'rising' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {trend === 'rising' ? '↑ Getting Deeper' : '↓ Getting Shallower'}
          </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">Current Level</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{latestLevel}m</p>
      </div>

      {/* Average Level Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <BarChart2 className="h-6 w-6 text-purple-600" />
          </div>
          <div className="group relative">
            <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-900 text-white text-sm rounded-md -left-28 top-8">
              Average groundwater depth over past 12 months. Helps track long-term changes in water table.
            </div>
          </div>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">Average Level</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{averageLevel}m</p>
      </div>

      {/* Prediction Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="group relative">
            <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-900 text-white text-sm rounded-md -left-28 top-8">
              Expected future groundwater depth based on environmental and demographic factors.
            </div>
          </div>
          {currentPrediction && (
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {(currentPrediction.confidence * 100).toFixed(0)}% confidence
            </span>
          )}
        </div>
        <h3 className="text-gray-500 text-sm font-medium">Predicted Level</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {currentPrediction ? `${currentPrediction.predictedLevel}m` : '—'}
        </p>
      </div>

      {/* Risk Assessment Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="group relative">
            <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-900 text-white text-sm rounded-md -left-28 top-8">
              <p className="mb-1">Risk Levels Based on Depth:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Low (&lt;30m): Healthy levels, sustainable access</li>
                <li>Medium (30-35m): Warning zone, conservation needed</li>
                <li>High (&gt;35m): Critical depletion, immediate action required</li>
              </ul>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${riskLevel.bg} ${riskLevel.color}`}>
            {riskLevel.status}
          </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">Risk Level</h3>
        <p className={`text-2xl font-bold mt-1 ${riskLevel.color}`}>
          {riskLevel.status}
        </p>
      </div>
    </div>
  );
}