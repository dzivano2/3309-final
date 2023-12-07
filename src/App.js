import React from 'react';

// Import the BrowserRouter from 'react-router-dom' to handle routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your HomePage component (make sure the path is correct)
import HomePage from './HomePage';
import Inventory from './inventory'
import Orders from './orders';
import Menu from './menu';
import Reservations from './reservations';
import Employee from './employee';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/reservations" element={<Reservations/>}/>
          <Route path="/employee" element={<Employee/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
