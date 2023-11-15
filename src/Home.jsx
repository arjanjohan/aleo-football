import React from 'react';
import './Home.css'; // CSS file for Home component

const Home = ({ logo }) => {
  return (
    <div className="home">
      <h1>Welcome to Super Leo Lig</h1>
      <img src={logo} alt="Super Leo Lig Logo" className="home-logo" />
    </div>
  );
};

export default Home;