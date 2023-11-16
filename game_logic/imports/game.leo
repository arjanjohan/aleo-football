program game.leo {

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
        result: [u64; 2],
        game_finished: bool,
    }

    transition create_game (strategy: [Player; 11], opponent: address) -> game_state {
        return game_state {
            owner: self.caller,
            opponent: opponent,
            strategy_1: strategy,
            strategy_2: [0u64; 11],
            result: [0u64; 2],
            game_finished: false,
        };
        
    }

    transition join_game (game: game_state, strategy: [Player; 11]) -> game_state {
        // TODO: if oponent is null address, allow anyone to join
        let opponent: address = self.caller;
        if game.opponent == null_address {
            opponent: address = self.caller;
        } 
        else if game.opponent != self.caller {
            return;
        }
        
        return game_state {
            owner: game.owner,
            opponent: opponent,
            strategy_1: game.strategy_1,
            strategy_2: strategy,
            result: [0u64; 2],
            game_finished: false,
        };
    }

    transition play_game (game: game_state) -> game_state {
        let result: [u64; 2] = [0u64, 0u64];
        // Loop over all players
        for i: u8 in 0u8..11u8 {
            if game.strategy_1[i].attack > game.strategy_2[i].defense {
                result[0] += 1u64;
            }
            if game.strategy_2[i].attack > game.strategy_1[i].defense {
                result[1] += 1u64;
            }
        }

        return game_state {
            owner: game.owner,
            opponent: game.opponent,
            strategy_1: game.strategy_1,
            strategy_2: game.strategy_2,
            result: [0u64; 2],
            game_finished: true,
        };
    }
}