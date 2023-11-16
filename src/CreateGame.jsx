import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { csv } from "d3";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./CreateGame.css";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a formation" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Formations</SelectLabel>
          <SelectItem value="0">4-3-3</SelectItem>
          <SelectItem value="1">4-2-3-1</SelectItem>
          <SelectItem value="2">3-5-2</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

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

  // console.log("48", player);

  return (
    <div ref={drop} className={`grid-slot ${isDisabled ? "disabled" : ""}`}>
      {player && !isDisabled && (
        <Player player={player} movePlayer={movePlayer} />
      )}
    </div>
  );
};

const SelectTeam = ({ onTeamSelected, setIsGameStarted }) => {
  const teams = [
    {
      name: "Team A",
      image: "player_a",
    },
    {
      name: "Team B",
      image: "player_b",
    },
    {
      name: "Team C",
      image: "player_c",
    },
  ];
  return (
    <div className="select-team-container">
      {teams.map((team) => {
        console.log("teams", team);
        return (
          <button
            key={team.name}
            className="team-option"
            onClick={() => {
              console.log("team", team.name);
              onTeamSelected(team.name);
              setIsGameStarted(true);
            }}
          >
            <img
              src={`/images/${team.image}.png`}
              alt={team}
              className="team-image"
            />
            <div className="team-name">{team.name}</div>
          </button>
        );
      })}
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
  const [activePlayers, setActivePlayers] = useState([]);
  const [benchPlayers, setBenchPlayers] = useState([]);
  const [totalAttack, setTotalAttack] = useState(0);
  const [totalDefence, setTotalDefense] = useState(0);
  const [grid, setGrid] = useState(Array.from({ length: 16 }, () => null)); // Assuming a 3x4 grid

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
        }))
        .sort((a, b) => a.id - b.id);
      console.log(
        "🚀 ~ file: CreateGame.jsx:103 ~ csv ~ teamPlayers:",
        teamPlayers
      );
      setBenchPlayers(teamPlayers);
    });
  }, [selectedTeam]);

  // const movePlayer = (playerId, slot) => {
  //   setGrid((prevGrid) => {
  //     const newGrid = [...prevGrid];
  //     const playerIndex = benchPlayers.findIndex((p) => p.id === playerId);
  //     const player = benchPlayers[playerIndex];

  //     if (playerIndex !== -1) {
  //       setBenchPlayers((prevPlayers) =>
  //         prevPlayers.filter((p) => p.id !== playerId)
  //       );
  //     }
  //     const targetIndex = newGrid.findIndex((p) => p?.id === playerId);

  //     if (targetIndex !== -1) {
  //       newGrid[targetIndex] = null;
  //     }

  //     setActivePlayers(newGrid.filter((p) => p !== null));

  //     newGrid[slot] = player;

  //     return newGrid;
  //   });
  // };

  //TODO add formation dropdown for team

  const movePlayer = (playerId, slot) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const playerIndexOnField = activePlayers.findIndex(
        (p) => p.id === playerId
      );
      const playerIndexOnBench = benchPlayers.findIndex(
        (p) => p.id === playerId
      );

      if (playerIndexOnField !== -1) {
        const replacedPlayer = newGrid[slot];

        // Remove the player from the field
        setActivePlayers((prevPlayers) =>
          prevPlayers.map((p, index) =>
            index === playerIndexOnField ? null : p
          )
        );

        // Add the replaced player back to the bench with sorted order
        if (replacedPlayer) {
          setBenchPlayers((prevPlayers) =>
            [...prevPlayers, replacedPlayer].sort((a, b) => a.id - b.id)
          );
        }
      } else if (playerIndexOnBench !== -1) {
        // Remove the player from the bench
        setBenchPlayers((prevPlayers) =>
          prevPlayers.filter((p) => p.id !== playerId)
        );

        // Add the player to the field
        setActivePlayers((prevPlayers) => {
          const updatedPlayers = [...prevPlayers];
          updatedPlayers[slot] = benchPlayers[playerIndexOnBench];
          return updatedPlayers;
        });

        // Add the replaced player back to the bench with sorted order
        const replacedPlayer = newGrid[slot];
        if (replacedPlayer) {
          setBenchPlayers((prevPlayers) =>
            [...prevPlayers, replacedPlayer].sort((a, b) => a.id - b.id)
          );
        }
      }

      // Update the newGrid with the correct player object
      newGrid[slot] = benchPlayers[playerIndexOnBench];

      return newGrid;
    });
  };

  useEffect(() => {
    // Calculate total attack and defense whenever activePlayers changes
    const newTotalAttack = activePlayers.reduce(
      (sum, player) => (player ? sum + player.attackScore : sum),
      0
    );
    const newTotalDefense = activePlayers.reduce(
      (sum, player) => (player ? sum + player.defenseScore : sum),
      0
    );

    // Update the state with the new totals
    setTotalAttack(newTotalAttack);
    setTotalDefense(newTotalDefense);
  }, [activePlayers]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row p-16 h-full gap-4">
        <div className="grid-container w-[60%]">
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
        <div className="flex flex-col w-1/3">
          <div className="flex flex-col py-4 whitespace-nowrap">
            <h1>Current Attack : {totalAttack}</h1>
            <h1>Current Defence : {totalDefence}</h1>
          </div>
          <div className="w-full flex flex-col overflow-y-auto h-[calc(100vh_-_40px)] p-5">
            {benchPlayers.map((player) => {
              // console.log("152", player);
              return (
                <Player
                  key={player.id}
                  player={player}
                  movePlayer={movePlayer}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

// ... (rest of the code)

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
        <div className="flex justify-center items-center flex-col mt-8 h-full">
          <h1 className="text-3xl tracking-tighter">Select your team</h1>
          <SelectTeam
            setIsGameStarted={setIsGameStarted}
            onTeamSelected={handleTeamSelected}
          />
        </div>
      )}
    </div>
  );
};

export default CreateGame;
