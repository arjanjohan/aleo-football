import { Card } from "@/components/ui/card";
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

function SelectFormation() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue className="" placeholder="Select a formation" />
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
const Player = ({ player, movePlayer, isActive }) => {
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
    <Card
      className={`flex  bg-white ${
        isActive ? "w-2/3 h-28 p-2" : "w-full h-32 p-4"
      } shadow-lg  rounded-[2px]  transition duration-200 ease-in-out hover:scale-105 `}
    >
      <div
        ref={drag}
        className={`flex relative  ${
          !isActive
            ? " w-full h-full items-center justify-center"
            : "w-full h-full"
        } `}
      >
        <div className="flex items-center">
          <img
            src={player.image}
            alt={player.name}
            className={`${isActive ? "w-16 h-16  " : "w-14 h-14"} `}
          />
        </div>
        <div
          className={`text-black h-full flex flex-col items-center ${
            isActive ? "gap-1" : "gap-2"
          }`}
        >
          <p className="font-bold whitespace-nowrap">{player.name}</p>
          <p className="">
            <span className="font-bold">A:</span> {player.attackScore}
          </p>
          <p className="">
            <span className="font-bold">D:</span> {player.defenseScore}
          </p>
        </div>
      </div>
    </Card>
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
        <Player player={player} movePlayer={movePlayer} isActive={true} />
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
            className="flex flex-col items-center border bg-neutral-100 cursor-pointer transition duration-300 ease-in-out p-2.5 w-64 h-80 rounded-[10px] border-solid hover:scale-105 border-[#ddd]"
            onClick={() => {
              console.log("team", team.name);
              onTeamSelected(team.name);
              setIsGameStarted(true);
            }}
            q
          >
            <img
              src={`/images/${team.image}.png`}
              alt={team}
              className="w-48 h-64"
            />
            <h3 className="font-bold text-xl text-black tracking-tighter mt-2">
              {team.name}
            </h3>
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

  //TODO make the players removable with double click

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
      <div className="flex flex-row px-16 py-8 bg-white h-[90vh] w-full gap-4">
        <div className=" relative bg-field grid grid-cols-4  bg-cover object-contain bg-center max-h-[85vh]  bg-no-repeat w-full   ">
          <SelectFormation />

          {/* <div className="grid-container "> */}
          {grid.map((player, index) => {
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
        <div className="flex flex-col w-1/3 h-auto bg-black px-4 rounded-md">
          <div className="flex flex-col py-4 px-4 whitespace-nowrap">
            <h1 className="text-xl tracking-tighter">
              Current Attack : {totalAttack}
            </h1>
            <h1 className="text-xl tracking-tighter">
              Current Defence : {totalDefence}
            </h1>
          </div>
          <div className="w-full grid grid-cols-2 gap-2 overflow-y-auto h-[calc(100vh_-_40px)] p-5">
            {benchPlayers.map((player) => {
              return (
                <Player
                  key={player.id}
                  player={player}
                  movePlayer={movePlayer}
                  isActive={false}
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
    <div className="">
      {isGameStarted ? (
        <Strategy selectedTeam={selectedTeam} />
      ) : (
        <div className="flex justify-center items-center flex-col mt-8 h-full gap-4">
          <h1 className="text-5xl tracking-tighter ">Select your team</h1>
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
