import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Player component
const Player = ({ player, movePlayer }) => {
  const [, drag] = useDrag(() => ({
    type: 'player',
    item: { id: player.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        movePlayer(item.id, dropResult.slot);
      }
    }
  }));

  return (
    <div ref={drag} style={{ width: 50, height: 50, border: '1px solid black', margin: 5 }}>
      {player.name}
    </div>
  );
};

// GridSlot component
const GridSlot = ({ slot, player, movePlayer }) => {
  const [, drop] = useDrop(() => ({
    accept: 'player',
    drop: () => ({ slot }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div ref={drop} className="grid-slot">
      {player && <Player player={player} movePlayer={movePlayer} />}
    </div>
  );
};

// App component
const App = () => {
  const [players, setPlayers] = useState(
    Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Player ${i + 1}` }))
  );
  const [grid, setGrid] = useState(Array.from({ length: 12 }, () => null));

  const movePlayer = (playerId, slot) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const playerIndex = players.findIndex(p => p.id === playerId);
      const player = players[playerIndex];
      const targetIndex = newGrid.findIndex(p => p?.id === playerId);

      if (targetIndex !== -1) {
        newGrid[targetIndex] = null;
      }

      newGrid[slot] = player;

      return newGrid;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <div className="grid-container">
          {grid.map((player, index) => (
            <GridSlot key={index} slot={index} player={player} movePlayer={movePlayer} />
          ))}
        </div>
        <div>
          {players.map(player => (
            <Player key={player.id} player={player} movePlayer={movePlayer} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
