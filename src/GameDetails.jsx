import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GameDetails.css';

const GameDetails = () => {
  const { game_id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    // Fetch the game details from your API/backend
    const fetchGameDetails = async () => {
      const response = await fetch(`/api/games/${game_id}`);
      const data = await response.json();
      setGameDetails(data);
    };

    fetchGameDetails();
  }, [game_id]);

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-details-container">
      <h1>Game Details</h1>
      {/* Display the game details here */}
      <div>Game ID: {gameDetails.id}</div>
      {/* ... other details */}
    </div>
  );
};

export default GameDetails;
