program strategy.leo {

    record game_state {
        owner: address
        opponent: address,
        strategy_1: [u64; 11],
        strategy_2: [u64; 11],
        result: [u64; 2],
        game_finished: bool,
    }

    transition create_game (strategy: [u64; 11], opponent: address) -> game_state {
        return game_state {
            owner: self.caller,
            opponent: opponent,
            strategy_1: strategy,
            strategy_2: [0u64; 11],
            result: [0u64; 2],
            game_finished: false,
        };
        
    }

    transition join_game (game: game_state, strategy: [u64; 11]) -> game_state {
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
        return game_state {
            owner: game.owner,
            opponent: opponent,
            strategy_1: game.strategy_1,
            strategy_2: game.strategy_2,
            result: [0u64; 2],
            game_finished: true,
        };
    }
}