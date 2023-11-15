import React from 'react';
import logo from '/super-leo-lig-logo.png'; // Update the path to where you save your logo
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Super Leo Lig" className="navbar-logo" />
      <div className="navbar-menu">
        <a href="/create-game" className="navbar-item">Create Game</a>
        <a href="/games" className="navbar-item">Games</a>
        <a href="/leaderboard" className="navbar-item">Leaderboard</a>
      </div>
    </nav>
  );
};

export default Navbar;
