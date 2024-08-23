import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HighlightedCars from './components/HighlightedCars';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />  {/* 显示导航栏 */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/highlighted-cars" element={<HighlightedCars />} />
      </Routes>
    </Router>
  );
}

export default App;
