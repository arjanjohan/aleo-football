import game.leo;

// The 'game_logic' program.
program game_logic.aleo {
    transition main(public a: u32, b: u32) -> u32 {
        let c: u32 = a + b;
        return c;
    }

    transition create_game(
        strategy: [Player; 11],
        opponent: address,
    ) -> game.leo/game_state.record {

        let state: game_state = game.leo/create_game(strategy, opponent);

        return state

    }

    transition join_game(
        game: game_state, 
        strategy: [Player; 11],
    ) -> game.leo/game_state.record {

        let state: game_state = game.leo/join_game(game, strategy);

        return state
    }
}
