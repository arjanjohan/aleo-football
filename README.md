# Super Leo Lig

<img src="https://github.com/arjanjohan/aleo-football/blob/cc1f8b8f7e0dfc350ab39ee87ffa07d1dcfa14e0/public/logo_2.png" alt="logo" width="500"/>

⚽ Super Leo Lig is an on-chain football manager game that leverages the privacy that Aleo provides to hide players' strategies from opponents.

⚙️ Built using Leo, Puzzle SDK, Obscura SDK, React and Javascript.

- 🧾 **ZK proofs**: Players compute proof that they use a valid strategy and commit to their strategy on-chain.
- ⛓️ **Smart contracts**: Verifies strategies and winner. After this tokens can be distributed to winners
- 🖼️ **Frontend**: Results are generated in the browser based on strategies.

## Contents
- [Contents](#contents)
- [Diagram](#diagram)
- [Links](#links)
- [Hackathon bounties](#hackathon-bounties)
- [Team](#team)

## Diagram
![diagram](https://github.com/zkAutochess/zkAutochess/blob/6423819e59e02654b2e04413f7c4d5ecaeed3555/files/schema-red.png)

## Links
- [Deployed game]()
- [Devpost](https://devpost.com/software/super-leo-lig)
- [Presentation slides](https://docs.google.com/presentation/d/1wmOayL9An8hf2roC52FTexAK3fVqePfloG6mtR5j3TE/edit?usp=sharing)
- [Deployed contract]()

## Hackathon bounties
#### ​Kryha - Best zkLeaderboard 
The leaderboard leo contract is extended to include more fields. We log the results (win, draw and loss) and goals score/conceded. Based on these values we can calculate score, games played and goal difference values that are shown in the frontend.

#### Puzzle - Best Casino Game
Our project leverages the Puzzle SDK to prevent ghosting by players who think they will lose after the formations are revealed. By setting a timelock on the multisig, the player who ghosts will automatically forfeit the game if the timelock expires. This mechanic ensures all games will be played, since the outcome of forfeiting is always worse than playing the game.

## Team
This project was build at ZK Hack Istanbul 2023 by:

- [arjanjohan](https://x.com/arjanjohan/)
- [Umut](http://x.com/nhestrompia)
