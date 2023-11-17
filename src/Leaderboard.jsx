// Leaderboard.jsx
import React from "react";
// import './Leaderboard.css'; // Assuming you have a separate CSS file for the Leaderboard
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Leaderboard = () => {
  return (
    <section className="w-full  text-black py-6 px-2 md:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2 tracking-tighter">
          Leo League Leaderboard
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Team</TableHead>
                <TableHead className="underline">GP</TableHead>
                <TableHead className="underline">W</TableHead>
                <TableHead className="underline">L</TableHead>
                <TableHead className="underline">GF</TableHead>
                <TableHead className="underline">GA</TableHead>
                <TableHead className="underline">P</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center">
                  <img
                    alt="Team A Icon"
                    className="mr-2"
                    height="20"
                    src="/club_1.jpeg"
                    style={{
                      aspectRatio: "20/20",
                      objectFit: "cover",
                      borderRadius: 999,
                    }}
                    width="20"
                  />
                  <span className="font-medium">TMA</span>
                </TableCell>
                <TableCell>12</TableCell>
                <TableCell>32</TableCell>
                <TableCell>12</TableCell>
                <TableCell>10</TableCell>
                <TableCell>2</TableCell>
                <TableCell>30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center">
                  <img
                    alt="Team B Icon"
                    className="mr-2"
                    height="20"
                    src="/club_2.jpeg"
                    style={{
                      aspectRatio: "20/20",
                      objectFit: "cover",
                      borderRadius: 999,
                    }}
                    width="20"
                  />
                  <span className="font-medium">TMB</span>
                </TableCell>
                <TableCell>12</TableCell>
                <TableCell>28</TableCell>
                <TableCell>14</TableCell>
                <TableCell>9</TableCell>
                <TableCell>3</TableCell>
                <TableCell>27</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center">
                  <img
                    alt="Team C Icon"
                    className="mr-2"
                    height="20"
                    src="/club_3.jpeg"
                    style={{
                      aspectRatio: "20/20",
                      objectFit: "cover",
                      borderRadius: 999,
                    }}
                    width="20"
                  />
                  <span className="font-medium">TMC</span>
                </TableCell>
                <TableCell>12</TableCell>
                <TableCell>27</TableCell>
                <TableCell>15</TableCell>
                <TableCell>8</TableCell>
                <TableCell>4</TableCell>
                <TableCell>24</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
