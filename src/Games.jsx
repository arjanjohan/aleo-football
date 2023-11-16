import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import "./Games.css"; // CSS file for Games component
import club1 from "/club_1.jpeg"; // Update the path to your logo image
import club2 from "/club_2.jpeg"; // Update the path to your logo image

const Games = () => {
  // You'll need to fetch or manage game data in state
  // This is just placeholder content
  const games = [
    {
      id: 1,
      homeTeam: "Lions",
      homeLogo: "club_1.jpeg",
      awayTeam: "Tigers",
      awayLogo: "club_2.jpeg",
      outcome: "1-0",
      state: "completed",
    },
    {
      id: 2,
      homeTeam: "Pandas",
      homeLogo: "club_1.jpeg",
      awayTeam: "Bears",
      awayLogo: "club_3.jpeg",
      outcome: "1-0",
      state: "completed",
    },
    {
      id: 3,
      homeTeam: "Dogs",
      homeLogo: "club_2.jpeg",
      awayTeam: "Cars",
      awayLogo: "club_3.jpeg",
      outcome: "1-0",
      state: "completed",
    },
    // ... other games
  ];

  return (
    <section className="w-screen p-4 ">
      <div className="flex w-full justify-center mt-4">
        <div className="flex w-full  max-w-sm items-center space-x-2">
          <Input type="text" className="text-black" placeholder="Room ID" />
          <Button type="submit">Join Room</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 -mt-4 gap-4">
        {games.map((game) => (
          <Card
            key={game.id}
            className=" my-10 max-w-md shadow-lg rounded-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row justify-between p-6 space-y-6 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <img
                  alt="Team A Logo"
                  className="rounded-full"
                  height="50"
                  src={club1}
                  style={{
                    aspectRatio: "50/50",
                    objectFit: "cover",
                  }}
                  width="50"
                />
                <span className="font-bold text-lg">Team A</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Premier League
                </p>
                <p className="text-xl font-bold">3 - 2</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Full Time
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-lg">Team B</span>
                <img
                  alt="Team B Logo"
                  className="rounded-full"
                  height="50"
                  src={club2}
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
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
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
