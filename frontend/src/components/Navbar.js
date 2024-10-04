// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: Create a separate CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/apod">APOD</Link></li>
        <li><Link to="/mars-photos">Mars Photos</Link></li>
        <li><Link to="/epic-images">EPIC Images</Link></li>
        <li><Link to="/neo">Near Earth Objects</Link></li>
        <li><Link to="/nasa-library">NASA Library</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
