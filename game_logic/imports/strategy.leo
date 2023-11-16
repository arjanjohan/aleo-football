program strategy.leo {

    record game {
        owner: address
        opponent: address,
        game_id: u64,
        strategy_1: [u64; 11],
        strategy_2: [u64; 11],
        result: [u64; 2],
    }

    transition create_game (strategy: [u64; 11]) -> game {
        return game {
            owner: self.caller,
            opponent: 0x0,
            game_id: 0,
            strategy_1: strategy,
            strategy_2: [0; 11],
            result: [0; 2],
        } then finalize(strategy);
        
    }

    finalize create_game (strategy: [u64; 11]) {
    
    }

    transition join_game (game_id: u64, strategy: [u64; 11]) -> game {
        return game {
            owner: self.caller,
            opponent: 0x0,
            game_id: 0,
            strategy_1: [0; 11],
            strategy_2: strategy,
            result: [0; 2],
        } then finalize(strategy);
    }

    
    finalize join_game (strategy: [u64; 11]) {
    
    }
}