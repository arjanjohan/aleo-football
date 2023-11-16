import { csv } from "d3";
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./CreateGame.css";

// Player.jsx
const Player = ({ player, movePlayer }) => {
  const [, drag] = useDrag(() => ({
    type: "player",
    item: { id: player.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        movePlayer(item.id, dropResult.slot);
      }
    },
  }));

  console.log("player 20", player);

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
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "player",
      canDrop: () => !isDisabled,
      drop: () => ({ slot }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [isDisabled]
  );

  return (
    <div ref={drop} className={`grid-slot ${isDisabled ? "disabled" : ""}`}>
      {player && !isDisabled && (
        <Player player={player} movePlayer={movePlayer} />
      )}
    </div>
  );
};

const SelectTeam = ({ onTeamSelected, setIsGameStarted }) => {
  return (
    <div className="select-team-container">
      {["Team A", "Team B", "Team C"].map((team) => (
        <button
          key={team}
          className="team-option"
          onClick={() => {
            console.log("team", team);
            onTeamSelected(team);
            setIsGameStarted(true);
          }}
        >
          <img
            src={`/images/player_${team.toLowerCase()}.png`}
            alt={team}
            className="team-image"
          />
          <div className="team-name">{team}</div>
        </button>
      ))}
    </div>
  );
};

const fetchCSV = async () => {
  console.log("fetching csv");
  const response = await fetch("/players.csv");
  const rawData = await response.text();
  return csv(rawData);
};

// Strategy component
const Strategy = ({ selectedTeam }) => {
  const [players, setPlayers] = useState([]);
  const [grid, setGrid] = useState(Array.from({ length: 12 }, () => null)); // Assuming a 3x4 grid

  useEffect(() => {
    // Fetch and parse the CSV data on component mount
    csv("/players.csv").then((data) => {
      console.log("data 95", data, selectedTeam);
      // Filter the data for the selected team and set the players state
      const teamPlayers = data
        .filter((player) => player.team === selectedTeam) // Filter by selectedTeam
        .map((player) => ({
          ...player,
          image: `/images/${player.image}`,
          attackScore: Number(player.attackScore),
          defenseScore: Number(player.defenseScore),
        }));
      console.log(
        "🚀 ~ file: CreateGame.jsx:103 ~ csv ~ teamPlayers:",
        teamPlayers
      );
      setPlayers(teamPlayers);
    });
  }, [selectedTeam]);

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
              <GridSlot
                key={index}
                slot={index}
                player={player}
                movePlayer={movePlayer}
                isDisabled={isDisabled}
              />
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

// CreateGame component
const CreateGame = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  console.log("isGamestarted", isGameStarted, selectedTeam);

  const handleTeamSelected = (team) => {
    setSelectedTeam(team);
  };

  // If a team is selected, render CreateGame; otherwise, render SelectTeam
  return (
    <div className="team-setup-container">
      {isGameStarted ? (
        <Strategy selectedTeam={selectedTeam} />
      ) : (
        <SelectTeam
          setIsGameStarted={setIsGameStarted}
          onTeamSelected={handleTeamSelected}
        />
      )}
    </div>
  );
};

export default CreateGame;
