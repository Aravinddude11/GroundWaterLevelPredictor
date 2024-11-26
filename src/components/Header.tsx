import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets, BarChart2, Settings, HelpCircle, Users } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-200' : 'text-white';
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:text-blue-200 transition">
            <Droplets className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Ground Water Level Predictor</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className={`flex items-center space-x-2 hover:text-blue-200 transition ${isActive('/')}`}>
                  <BarChart2 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className={`flex items-center space-x-2 hover:text-blue-200 transition ${isActive('/settings')}`}>
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/help" className={`flex items-center space-x-2 hover:text-blue-200 transition ${isActive('/help')}`}>
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`flex items-center space-x-2 hover:text-blue-200 transition ${isActive('/contact')}`}>
                  <Users className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}