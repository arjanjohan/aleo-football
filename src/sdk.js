import {
  Account,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
  ProgramManager,
} from "@aleohq/sdk";
import { getUsers } from "./db";
// import { env } from "./utils";

const keyProvider = new AleoKeyProvider();
keyProvider.useCache(true);

// const account = new Account({ privateKey: process.env.VITE_PRIVATE_KEY });
const account = new Account({
  privateKey: "APrivateKey1zkpFjTaTsKw57Mjz9bM7oWwshUuHrDQs2WcgWSge8jyrN7K",
});

const networkClient = new AleoNetworkClient(
  "https://aleo.obscura.network/v1/4d102ff0-9ad6-4263-a8d0-0671e95c17b3"
);
const recordProvider = new NetworkRecordProvider(account, networkClient);

const programManager = new ProgramManager(
  "https://aleo.obscura.network/v1/4d102ff0-9ad6-4263-a8d0-0671e95c17b3",
  keyProvider,
  recordProvider
);
programManager.setAccount(account);

const parseUserStruct = (struct, username) => {
  const lines = struct.split("\n");

  let score;
  let gamesPlayed;

  lines.forEach((line) => {
    const trimmed = line.trim();

    const parseU64 = (val) =>
      val.split(":")[1].trim().replace(",", "").replace("u64", "");

    if (trimmed.startsWith("score")) {
      const value = parseU64(trimmed);
      score = parseInt(value);
      return;
    }

    if (trimmed.startsWith("games_played")) {
      const value = parseU64(trimmed);
      gamesPlayed = parseInt(value);
      return;
    }
  });

  if (!score || !gamesPlayed) throw new Error("Failed parsing Aleo struct");

  return { score, gamesPlayed, username, position: 0 }; // position will be calculated later
};

const retrieveLeaderboard = async () => {
  const users = getUsers();
  console.log("🚀 ~ file: sdk.js:63 ~ retrieveLeaderboard ~ users:", users);

  const promises = Object.entries(users).map(async ([username, id]) => {
    const response = await networkClient.getProgramMappingValue(
      "leaderboard_football.aleo",
      "users",
      `aleo12q3fkv28yxsaw8zry0lzqe28a7eqc3yn2mal8pz3xs04sjv43gysr2lwv8`
    );
    if (response instanceof Error || !response || response === "null") {
      throw response;
    }
    return parseUserStruct(response, username);
  });
  console.log("🚀 ~ file: sdk.js:76 ~ promises ~ promises:", promises);

  const players = await Promise.all(promises);

  players.sort((a, b) => -(a.score - b.score));

  return {
    players: players.map((player, index) => ({
      ...player,
      position: index + 1,
    })),
  };
};

export const sdk = { retrieveLeaderboard };
