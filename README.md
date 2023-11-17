# Super Leo Lig

<img src="https://github.com/arjanjohan/aleo-football/blob/cc1f8b8f7e0dfc350ab39ee87ffa07d1dcfa14e0/public/logo_2.png" alt="logo" width="500"/>

⚽ Super Leo Lig is an on-chain football manager game that leverages the privacy that Aleo provides to hide players' strategies from opponents.

⚙️ Built using Leo, Obscura SDK, Puzzle SDK, React and Javascript.

- 🧾 **Privacy on Aleo**: Players commit to a strategy privately using Aleo.
- ⛓️ **Smart contracts**: Verifies strategies and results of the game.
- 🧩 **Multisig solution**: The Puzzle multisig secures the wagered amounts and prevents ghosting by losing players.
- 📑 **Leaderboard**: The Obscura leaderboard is updated live after each game played.
- 🖼️ **Frontend**: Results are generated in the browser based on strategies.



## Contents
- [Contents](#contents)
- [Diagram](#diagram)
- [Run and test](#run-and-test)
- [Links](#links)
- [Hackathon bounties](#hackathon-bounties)
- [Team](#team)

## Run and test
The frontend dapp can be deployed by running 
```
npm run dev
```

To test the smart contracts locally run the test suite from smart contracts directory.
```
cd game_logic_v0001
bash run.sh
```

To deploy the smart contracts to a local node please run this

```
snarkos developer deploy game_logic_v0001.aleo --private-key "APrivateKeyxxx" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 1000000
```

## Diagram
![diagram](https://github.com/arjanjohan/aleo-football/blob/d02fd71a8c20f54cd3cde26cc232b5123f0bcdbe/public/flow.png)

## Links
- [Devpost](https://devpost.com/software/super-leo-lig)
- [Presentation slides](https://docs.google.com/presentation/d/1wmOayL9An8hf2roC52FTexAK3fVqePfloG6mtR5j3TE/edit?usp=sharing)
- [Deployed game contract](https://aleo123.io/programDetail/game_logic_v0001.aleo)
- [Deployed leaderboard contract](https://aleo123.io/programDetail/leaderboard_football.aleo)

## Hackathon bounties
#### ​Kryha - Best zkLeaderboard 
The leaderboard leo contract is extended to include more fields. We log the results (win, draw and loss) and goals score/conceded. Based on these values we can calculate total points, number of games played and goal difference values that are also shown in the frontend. The update_score function from the leaderboard contract is called from the game_logic contract. After each game is played, the leaderboard will update based on the outcome.

#### Puzzle - Best Casino Game
The project needs to leverage the Puzzle SDK to prevent ghosting by players who think they will lose after the formations are revealed. By setting a timelock on the multisig, the player who ghosts will automatically forfeit the game if the timelock expires. This mechanic ensures all games will be played, since the outcome of forfeiting is always worse than playing the game. This is currently not implemented, but will be added as the next feature.

## Team
This project was build at Aleo zkHackathon by:

- [arjanjohan](https://x.com/arjanjohan/)
- [Umut](http://x.com/nhestrompia)
