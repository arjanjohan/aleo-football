// The 'game_logic' program.
program game_logic.aleo {
    transition main(public a: u32, b: u32) -> u32 {
        let c: u32 = a + b;
        return c;
    }

    transition create_game() -> bool {

    }

    transition accept_game() ->  {
    
    }
}
