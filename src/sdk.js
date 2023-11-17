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
console.log("🚀 ~ file: sdk.js:12 ~ keyProvider:", keyProvider);
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

const parseUserStruct = (struct) => {
  const lines = struct.split("\n");

  let goals_scored;
  let goals_conceded;
  let win;
  let loss;
  let draw;

  lines.forEach((line) => {
    const trimmed = line.trim();

    const parseU64 = (val) =>
      val.split(":")[1].trim().replace(",", "").replace("u64", "");

    if (trimmed.startsWith("goals_scored")) {
      const value = parseU64(trimmed);
      goals_scored = parseInt(value);
      return;
    }

    if (trimmed.startsWith("goals_conceded")) {
      const value = parseU64(trimmed);
      goals_conceded = parseInt(value);
      return;
    }

    if (trimmed.startsWith("win")) {
      const value = parseU64(trimmed);
      win = parseInt(value);
      return;
    }

    if (trimmed.startsWith("draw")) {
      const value = parseU64(trimmed);
      loss = parseInt(value);
      return;
    }

    if (trimmed.startsWith("loss")) {
      const value = parseU64(trimmed);
      draw = parseInt(value);
      return;
    }
  });

  if (!goals_conceded || !goals_scored)
    throw new Error("Failed parsing Aleo struct");

  return { win, draw, loss, goals_scored, goals_conceded, position: 0 }; // position will be calculated later
};

const retrieveLeaderboard = async () => {
  const users = getUsers();
  console.log("🚀 ~ file: sdk.js:63 ~ retrieveLeaderboard ~ users:", users);

  //   const promises = Object.entries(users).map(async ([username, id]) => {
  const response = await networkClient.getProgramMappingValue(
    "leaderboard_football.aleo",
    "users",
    `aleo12q3fkv28yxsaw8zry0lzqe28a7eqc3yn2mal8pz3xs04sjv43gysr2lwv8`
  );
  console.log("🚀 ~ file: sdk.js:71 ~ promises ~ response:", response);
  if (response instanceof Error || !response || response === "null") {
    throw response;
  }

  const convertedData = {};
  for (const key in response) {
    console.log("ley", response);
    const valueAsString = String(response[key]).replace(/u64$/, "");
    convertedData[key] = parseInt(valueAsString);
  }

  //   console.log("parse", parseUserStruct(response, username));

  return parseUserStruct(response);
  //   });
  console.log("🚀 ~ file: sdk.js:76 ~ promises ~ promises:", convertedData);

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
