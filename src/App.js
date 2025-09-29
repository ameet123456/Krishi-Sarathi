import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import Navbar from './components/Navbar';
import Sarathi from './pages/Sarathi';
import Market_price from './pages/Market_price';
import Disease_detection from './pages/Disease_detection';
import Crop_advice from './pages/Crop_advice';
import Soil_test from './pages/Soil_test';
import Footer from './components/Footer';
import Floating_button from './components/Floating_button';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/sarathi" element={<Sarathi />} />
        <Route path="/market-price" element={<Market_price />} />
        <Route path="/disease-detection" element={<Disease_detection />} />
        <Route path="/crop-advice" element={<Crop_advice />} />
        <Route path="/soil-test" element={<Soil_test />} />
      </Routes>
      <Floating_button />
      <Footer />

    </div>
    </Router>
  )
}
export default App;