
// The 'game_logic' program.
program game_logic.aleo {

    struct Player {
        id: u64,
        attack: u64,
        defense: u64,
    }

    record game_state {
        owner: address
        opponent: address,
        strategy_1: [Player; 11],
        strategy_2: [Player; 11],
        goals_1: u64,
        goals_2: u64,
        game_finished: bool,
    }   

    transition create_game_private (strategy: [Player; 11], opponent: address) -> game_state {
        return game_state {
            owner: self.caller,
            opponent: opponent,
            strategy_1: strategy,
            strategy_2: strategy,
            goals_1: 0u64,
            goals_2: 0u64,
            game_finished: false,
        }; 
    }

    transition create_game_open (strategy: [Player; 11]) -> game_state {
        return game_state {
            // Since there is no null value, prefill strategy_2 and opponent with dummy values
            owner: self.caller,
            opponent: self.caller,
            strategy_1: strategy,
            strategy_2: strategy,
            goals_1: 0u64,
            goals_2: 0u64,
            game_finished: false,
        };
        
    }

    transition join_game (game: game_state, strategy: [Player; 11]) -> game_state {
        // Only if opponent is equal to owner a player is allowed to join. Otherwise it's a private game
        assert_eq(game.owner, game.opponent);
        
        return game_state {
            owner: game.owner,
            opponent: self.caller,
            strategy_1: game.strategy_1,
            strategy_2: strategy,
            goals_1: game.goals_1,
            goals_2: game.goals_1,
            game_finished: false,
        };
    }

    transition play_game (game: game_state) -> game_state {
        let goals_1: u64 = 0u64;
        let goals_2: u64 = 0u64;
        for i: u8 in 0u8..11u8 {
            if game.strategy_1[i].attack > game.strategy_2[i].defense {
                goals_1 += 1u64;
            }
            if game.strategy_2[i].attack > game.strategy_1[i].defense {
                goals_2 += 1u64;
            }
        }

        return game_state {
            owner: game.owner,
            opponent: game.opponent,
            strategy_1: game.strategy_1,
            strategy_2: game.strategy_2,
            goals_1: 0u64,
            goals_2: 0u64,
            game_finished: true,
        };
    }
}
