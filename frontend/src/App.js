// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Ensure Link is imported
import './App.css'; // Make sure you have your CSS ready
import APOD from './pages/APOD'; // Assuming you have these pages created
import MarsPhotos from './pages/MarsPhotos';
import EPICImages from './pages/EPICImages';
import NeoWs from './pages/NeoWs';
import NasaLibrary from './pages/NasaLibrary';

function Home() {
  return (
    <div className="homepage">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src="/space-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="overlay">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li><Link to="/apod">APOD</Link></li>
            <li><Link to="/mars-photos">Mars Photos</Link></li>
            <li><Link to="/epic-images">EPIC Images</Link></li>
            <li><Link to="/neo">Near Earth Objects</Link></li>
            <li><Link to="/nasa-library">NASA Library</Link></li>
          </ul>
        </nav>

        {/* Description */}
        <div className="description">
          <h1>NASA Data Explorer</h1>
          <p>
            Explore space-related data from NASA's vast collection. <br /> View stunning images, learn about Mars rovers,
            explore near-Earth objects, and much more!
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Other routes */}
        <Route path="/apod" element={<APOD />} />
        <Route path="/mars-photos" element={<MarsPhotos />} />
        <Route path="/epic-images" element={<EPICImages />} />
        <Route path="/neo" element={<NeoWs />} />
        <Route path="/nasa-library" element={<NasaLibrary />} />
      </Routes>
    </Router>
  );
}

export default App;
