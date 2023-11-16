
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
        formation_1: [Player; 11],
        formation_2: [Player; 11],
        public goals_1: u64,
        public goals_2: u64,
        public game_finished: bool,
    }   

    transition main () {
        
    }

    transition create_game_private (formation: [Player; 11], opponent: address) -> game_state {
        return game_state {
            owner: self.caller,
            opponent: opponent,
            formation_1: formation,
            formation_2: formation,
            goals_1: 0u64,
            goals_2: 0u64,
            game_finished: false,
        }; 
    }

    transition create_game_open (formation: [Player; 11]) -> game_state {
        return game_state {
            // Since there is no null value, prefill formation_2 and opponent with dummy values
            owner: self.caller,
            opponent: self.caller,
            formation_1: formation,
            formation_2: formation,
            goals_1: 0u64,
            goals_2: 0u64,
            game_finished: false,
        };
    }

    transition join_game (game: game_state, formation: [Player; 11]) -> game_state {
        // Only if opponent is equal to owner, a new player is allowed to join. Otherwise there is already an opponent.
        // assert_eq(game.owner, game.opponent) || assert_eq(self.caller, game.opponent);
        
        return game_state {
            owner: game.owner,
            opponent: self.caller,
            formation_1: game.formation_1,
            formation_2: formation,
            goals_1: game.goals_1,
            goals_2: game.goals_1,
            game_finished: false,
        };
    }

    transition play_game (game: game_state) -> game_state {
        let goals_1: u64 = 0u64;
        let goals_2: u64 = 0u64;
        for i: u8 in 0u8..11u8 {
            if game.formation_1[i].attack > game.formation_2[i].defense {
                goals_1 += 1u64;
            }
            if game.formation_2[i].attack > game.formation_1[i].defense {
                goals_2 += 1u64;
            }
        }

        return game_state {
            owner: game.owner,
            opponent: game.opponent,
            formation_1: game.formation_1,
            formation_2: game.formation_2,
            goals_1: 0u64,
            goals_2: 0u64,
            game_finished: true,
        };
    }
}
