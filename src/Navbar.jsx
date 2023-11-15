// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure this is correctly importing your CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-item">Home</Link>
      <Link to="/create-game" className="navbar-item">Create Game</Link>
      <Link to="/games" className="navbar-item">Games</Link>
      <Link to="/leaderboard" className="navbar-item">Leaderboard</Link>
    </nav>
  );
};

export default Navbar;
