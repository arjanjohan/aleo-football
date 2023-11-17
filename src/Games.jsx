import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./Games.css"; // CSS file for Games component

const games = [
  {
    id: 1,
    homeTeam: "Fenerbahçe",
    homeLogo: "fenerbahce.png",
    awayTeam: "Galatasaray",
    awayLogo: "galatasaray.png",
    score: "2-1",
    state: "completed",
  },
  {
    id: 2,
    homeTeam: "Beşiktaş",
    homeLogo: "besiktas-3.png",
    awayTeam: "Galatasaray",
    awayLogo: "galatasaray.png",
    score: "2-1",
    state: "completed",
  },
  {
    id: 3,
    homeTeam: "Galatasaray",
    homeLogo: "galatasaray.png",
    awayTeam: "Fenerbahçe",
    awayLogo: "fenerbahce.png",
    score: "0-2",
    state: "completed",
  },
  {
    id: 4,
    homeTeam: "Fenerbahçe",
    homeLogo: "fenerbahce.png",
    awayTeam: "Beşiktaş",
    awayLogo: "besiktas-3.png",
    score: "3-1",
    state: "completed",
  },
];

const Games = () => {
  // You'll need to fetch or manage game data in state
  // This is just placeholder content
  const navigate = useNavigate();

  return (
    <section className="w-screen px-4 ">
      <div className="flex w-full justify-center mt-3 ">
        <div className="flex w-full  max-w-sm items-center space-x-2">
          <Input type="text" className="text-black" placeholder="Room ID" />
          <Button onClick={() => navigate(`/game-room/3`)}>Join Room</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 space-y-2 mx-auto mt-4 content-center items-center justify-center">
        {games.map((game) => (
          <Card
            key={game.id}
            className="  max-w-md shadow-lg rounded-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row justify-between p-6 space-y-6 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <img
                  alt="Team A Logo"
                  className="rounded-full"
                  height="50"
                  src={game.homeLogo}
                  style={{
                    aspectRatio: "50/50",
                    objectFit: "cover",
                  }}
                  width="50"
                />
                <span className="font-bold text-lg">{game.homeTeam}</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Premier League
                </p>
                <p className="text-xl font-bold">{game.score}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {game.state === "completed" ? "Full Time" : "Ongoing"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">{game.awayTeam}</span>
                <img
                  alt="Team B Logo"
                  className="rounded-full"
                  height="50"
                  src={game.awayLogo}
                  style={{
                    aspectRatio: "50/50",
                    objectFit: "cover",
                  }}
                  width="50"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Match Date: 15th Nov 2023
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Stadium: Wembley, London
                </p>
              </div>
              {/* <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Refree: Pierluigi Webb
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Stadium: Wembley, London
              </p>
            </div> */}
            </div>
            <div className="px-6 py-2 border-t border-gray-100 dark:border-gray-700">
              <Button className="w-full" variant="outline">
                {game.state === "completed" ? "View Match Statistics" : "Play"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Games;
