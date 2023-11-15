// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CreateGame from './CreateGame';
import Games from './Games';
import Leaderboard from './Leaderboard';
import logo from '/super-leo-lig-logo.png'; // Update the path to your logo image

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home logo={logo} />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/games" element={<Games />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
