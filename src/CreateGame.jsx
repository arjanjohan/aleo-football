import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { csv } from 'd3';
import './CreateGame.css';

// Player.jsx
const Player = ({ player, movePlayer }) => {
  const [, drag] = useDrag(() => ({
    type: 'player',
    item: { id: player.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        movePlayer(item.id, dropResult.slot);
      }
    },
  }));

  return (
    <div ref={drag} className="player">
      <img src={player.image} alt={player.name} className="player-image" />
      <div className="player-stats">
        <div className="player-name">{player.name}</div>
        <div className="player-score">A: {player.attackScore}</div>
        <div className="player-score">D: {player.defenseScore}</div>
      </div>
    </div>
  );
};

// GridSlot component
const GridSlot = ({ slot, player, movePlayer, isDisabled }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'player',
    canDrop: () => !isDisabled,
    drop: () => ({ slot }),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    }),
  }), [isDisabled]);

  return (
    <div ref={drop} className={`grid-slot ${isDisabled ? 'disabled' : ''}`}>
      {player && !isDisabled && <Player player={player} movePlayer={movePlayer} />}
    </div>
  );
};

// Assume you have a function to fetch the CSV data
const fetchCSV = async () => {
  console.log("fetching csv");
  const response = await fetch('/players.csv');
  const rawData = await response.text();
  return csv(rawData);
};


// App component
const App = () => {
  const [players, setPlayers] = useState([]);
  const [grid, setGrid] = useState(Array.from({ length: 12 }, () => null)); // Assuming a 3x4 grid

  useEffect(() => {
    // Fetch and parse the CSV data on component mount
    csv('/players.csv').then((data) => {
      // Transform the data and set the players state
      const transformedData = data.map((player) => ({
        ...player,
        image: `/images/${player.image}`, // Adjust the path as necessary
        attackScore: Number(player.attackScore), // Ensure the scores are numbers
        defenseScore: Number(player.defenseScore),
      }));
      setPlayers(transformedData);
    });
  }, []);

  const movePlayer = (playerId, slot) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const playerIndex = players.findIndex((p) => p.id === playerId);
      const player = players[playerIndex];
      const targetIndex = newGrid.findIndex((p) => p?.id === playerId);

      if (targetIndex !== -1) {
        newGrid[targetIndex] = null;
      }

      newGrid[slot] = player;

      return newGrid;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <div className="grid-container">
          {grid.map((player, index) => {
            // Determine if the current slot should be disabled
            const isDisabled = index === 0 || index === 8; // Disables the top left and bottom left slots in a 3x4 grid
            return (
              <GridSlot key={index} slot={index} player={player} movePlayer={movePlayer} isDisabled={isDisabled} />
            );
          })}
        </div>
        <div className="overview-container">
          {players.map((player) => (
            <Player key={player.id} player={player} movePlayer={movePlayer} />
          ))}
        </div>
      </div>
    </DndProvider>
  );

};

export default App;