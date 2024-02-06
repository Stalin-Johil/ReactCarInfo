import React from 'react';
import './App.css';
import BrandList from './components/BrandList';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import ViewCars from './components/ViewCars';

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav style={{ marginBottom: '20px' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', background: '#333', padding: '10px 0' }}>
              <li style={{ margin: '0 15px' }}><NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</NavLink></li>
              <li style={{ margin: '0 15px' }}><NavLink to="/viewCars" style={{ color: 'white', textDecoration: 'none' }}>View Cars</NavLink></li>
              <li style={{ margin: '0 15px' }}><a href="#services" style={{ color: 'white', textDecoration: 'none' }}>Services</a></li>
              <li style={{ margin: '0 15px' }}><a href="#gallery" style={{ color: 'white', textDecoration: 'none' }}>Gallery</a></li>
              <li style={{ margin: '0 15px' }}><a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" Component={BrandList} />
            <Route path="/viewCars" Component={ViewCars} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
