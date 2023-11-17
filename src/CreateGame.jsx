import { Button } from "@/components/ui/button";
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
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { csv } from "d3";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "./CreateGame.css";

const LEADERBOARD_CONTRACT = "leaderboard_football.aleo";
const GAME_CONTRACT = "game_logic_v0001.aleo";

function SelectFormation({ setSelectedFormation }) {
  return (
    <Select className="">
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue className="" placeholder="Select a formation" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Formations</SelectLabel>
          <SelectItem value="0" onClick={() => setSelectedFormation("4-3-3")}>
            4-3-3
          </SelectItem>
          <SelectItem value="1" onClick={() => setSelectedFormation("4-2-3-1")}>
            4-2-3-1
          </SelectItem>
          <SelectItem value="2" onClick={() => setSelectedFormation("3-5-2")}>
            3-5-2
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Player.jsx
const Player = ({ player, movePlayer, removePlayer, isActive }) => {
  const [, drag] = useDrag(() => ({
    type: "player",
    item: { id: player.id },
    // canDrag: false,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        movePlayer(item.id, dropResult.slot);
      }
    },
  }));

  const handleDoubleClick = () => {
    console.log("doulbe");
    removePlayer(player.id);
  };

  return (
    <Card
      onDoubleClick={handleDoubleClick}
      className={`flex  bg-white ${
        isActive ? "w-2/3 h-28 p-2 opacity-80" : "w-full h-32 p-4 "
      } shadow-lg    transition duration-200 ease-in-out hover:scale-105 `}
    >
      <div
        ref={drag}
        className={`flex relative  ${
          !isActive
            ? " w-full h-full items-center justify-between"
            : "w-full h-full"
        } `}
      >
        <div className="flex items-center">
          <img
            src={player.image}
            alt={player.name}
            className={`${isActive ? "w-16 h-16  " : "w-20 h-20"} `}
          />
        </div>
        <div
          className={`text-black h-full flex flex-col items-center ${
            isActive ? "gap-1" : "gap-2"
          }`}
        >
          <p className="font-bold text-lg whitespace-nowrap">{player.name}</p>
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
const GridSlot = ({ slot, player, movePlayer, isDisabled, removePlayer }) => {
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
        <Player
          removePlayer={removePlayer}
          player={player}
          movePlayer={movePlayer}
          isActive={true}
        />
      )}
    </div>
  );
};

const SelectTeam = ({ onTeamSelected, setIsGameStarted }) => {
  const teams = [
    {
      name: "Fenerbahçe",
      image: "player_a",
    },
    {
      name: "Beşiktaş",
      image: "player_b",
    },
    {
      name: "Galatasaray",
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

// Strategy component
const Strategy = ({ selectedTeam }) => {
  const location = useLocation();
  const { supabase } = useSupabase();
  const [activePlayers, setActivePlayers] = useState([]);
  const [benchPlayers, setBenchPlayers] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [totalAttack, setTotalAttack] = useState(0);
  const [totalDefense, setTotalDefense] = useState(0);
  const [opponentTotalDefense, setOpponentTotalDefense] = useState(0);
  const [opponentTotalAttack, setOpponentTotalAttack] = useState(0);
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const { publicKey, requestTransaction } = useWallet();
  const [account, setAccount] = useState("");

  const [grid, setGrid] = useState(Array.from({ length: 16 }, () => null)); // Assuming a 3x4 grid

  // const removePlayer = (playerId) => {
  //   setBenchPlayers((prevPlayers) =>
  //     prevPlayers.filter((p) => p.id !== playerId)
  //   );
  //   setActivePlayers((prevPlayers) =>
  //     prevPlayers.filter((p) => p?.id !== playerId)
  //   );
  //   setGrid((prevGrid) => prevGrid.map((p) => (p?.id === playerId ? null : p)));
  // };

  const removePlayer = (playerId) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const playerIndexOnField = activePlayers.findIndex(
        (p) => p?.id === playerId
      );

      // Check if the player is on the field
      if (playerIndexOnField !== -1) {
        // Remove the player from the field
        setActivePlayers((prevPlayers) =>
          prevPlayers.map((p, index) =>
            index === playerIndexOnField ? null : p
          )
        );

        // Check if the player is not already on the bench
        const isPlayerOnBench = benchPlayers.some((p) => p.id === playerId);
        if (!isPlayerOnBench) {
          // Add the player back to the bench with sorted order
          setBenchPlayers((prevPlayers) =>
            [...prevPlayers, activePlayers[playerIndexOnField]].sort(
              (a, b) => a.id - b.id
            )
          );
        }
      }

      return newGrid;
    });
  };

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

      setBenchPlayers(teamPlayers);
    });
  }, [selectedTeam]);

  useEffect(() => {
    if (publicKey) {
      setAccount(publicKey);
    }
  }, []);

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

  const startGame = async () => {
    try {
      toast.info(
        <div className="p-2 ">
          <p className="text-lg tracking-tighter">Game Starting!</p>
        </div>
      );

      const record = `'{"id":"0f27d86a-1026-4980-9816-bcdce7569aa4","program_id":"game_logic_v0001.aleo","microcredits":"200000","spent":false,"data":{}}'`;
      // Note that the inputs must be formatted in the same order as the Aleo program function expects, otherwise it will fail
      const inputs = [JSON.parse(activePlayers), publicKey];
      const fee = 35_000; // This will fail if fee is not set high enough

      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        "game_logic_v0001.aleo",
        "transfer",
        inputs,
        fee
      );

      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const joinGame = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();

      toast.info(
        <div className="p-2 ">
          <p className="text-lg tracking-tighter">Game Starting!</p>
        </div>
      );

      // The record here is an output from the Requesting Records above
      const record = `'{"id":"0f27d86a-1026-4980-9816-bcdce7569aa4","program_id":"game_logic_v0001.aleo","microcredits":"200000","spent":false,"data":{}}'`;
      // Note that the inputs must be formatted in the same order as the Aleo program function expects, otherwise it will fail
      const inputs = [JSON.parse(activePlayers), publicKey];
      const fee = 35_000; // This will fail if fee is not set high enough

      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        "game_logic_v0001.aleo",
        "transfer",
        inputs,
        fee
      );

      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    } catch (error) {}
  };

  //TODO add formation dropdown for team

  const movePlayer = (playerId, slot) => {
    setCurrentPlayers((prevCurrentPlayers) => {
      const newCurrentPlayers = [...prevCurrentPlayers, benchPlayers[playerId]];
      return newCurrentPlayers;
    });

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const playerIndexOnField = activePlayers.findIndex(
        (p) => p?.id === playerId
      );
      const playerIndexOnBench = benchPlayers.findIndex(
        (p) => p.id === playerId
      );

      // Check if the player is on the field
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
          const formationColumns = selectedFormation.split("-").map(Number)[0];
          const rowIndex = Math.floor(slot / formationColumns);
          const colIndex = slot % formationColumns;
          updatedPlayers[rowIndex * formationColumns + colIndex] =
            benchPlayers[playerIndexOnBench];
          return updatedPlayers;
        });
      }

      // Update the newGrid with the correct player object
      newGrid[slot] = benchPlayers[playerIndexOnBench];

      return newGrid;
    });
  };

  const activePlayersCount = activePlayers.filter(Boolean).length;

  //TODO make the players removable with double click

  useEffect(() => {
    // Calculate total attack and defense whenever activePlayers changes
    console.log("346", activePlayers);
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
        <div className=" relative bg-field grid grid-cols-4  bg-cover  object-contain bg-center max-h-[85vh]  bg-no-repeat w-full   ">
          <div className="relative left-4 top-4">
            <SelectFormation
              selectedFormation={selectedFormation}
              setSelectedFormation={setSelectedFormation}
            />
          </div>

          {/* <div className="mt-4 "> */}
          {grid.map((player, index) => {
            const isDisabled = index === 0 || index === 8; // Disables the top left and bottom left slots in a 3x4 grid
            return (
              <GridSlot
                key={index}
                slot={index}
                player={player}
                movePlayer={movePlayer}
                isDisabled={isDisabled}
                removePlayer={removePlayer}
              />
            );
          })}
          {/* </div> */}
        </div>
        <div className="flex flex-col w-2/5 h-auto bg-black px-4 rounded-md">
          {activePlayersCount === 11 && (
            <div className="absolute right-24 top-36">
              <Button
                variant="outline"
                className="text-black"
                onClick={
                  location.pathname === "create-game" ? startGame : joinGame
                }
              >
                Start Game
              </Button>
            </div>
          )}
          <div className="flex flex-col py-4 px-4 whitespace-nowrap">
            <h1 className="text-xl tracking-tighter">
              Current Attack : {totalAttack}
            </h1>
            <h1 className="text-xl tracking-tighter">
              Current Defence : {totalDefense}
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
      <Toaster richColors position="bottom-center" />
    </div>
  );
};

export default CreateGame;
