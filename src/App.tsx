import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Header from './components/Header';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;