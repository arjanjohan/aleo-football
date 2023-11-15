import React from 'react';
import './Games.css'; // CSS file for Games component

const Games = () => {
  // You'll need to fetch or manage game data in state
  // This is just placeholder content
  const games = [
    { id: 1, homeTeam: 'Lions', awayTeam: 'Tigers', outcome: '1-0', state: 'completed' },
    // ... other games
  ];

  return (
    <div className="games-list">
      {games.map(game => (
        <div key={game.id} className="game">
          <span>Game ID: {game.id}</span>
          <span>{game.homeTeam} vs {game.awayTeam}</span>
          <span>Outcome: {game.outcome}</span>
          <button>{game.state === 'completed' ? 'Result' : 'Play'}</button>
        </div>
      ))}
    </div>
  );
};

export default Games;
