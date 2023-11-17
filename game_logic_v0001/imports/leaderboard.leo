program leaderboard.aleo {
    struct User {
        win: u64,
        draw: u64,
        loss: u64,
        goals_scored: u64,
        goals_conceded: u64
    }

    mapping users: address => User;

    transition update_score(user_id: address, goals_scored: u64, goals_conceded: u64) {
        // assert_eq(self.caller, self.signer);
        return then finalize(user_id, goals_scored, goals_conceded);
    }

    finalize update_score(user_id: address, goals_scored: u64, goals_conceded: u64) {
        let current_user: User = Mapping::get_or_use(users, user_id, User {
            win: 0u64,
            draw: 0u64,
            loss: 0u64,
            goals_scored: 0u64,
            goals_conceded: 0u64
        });

        Mapping::set(users, user_id, User {
            // Update result by 1
            win: goals_scored > goals_conceded ? current_user.win + 1u64 : current_user.win,
            draw: goals_scored == goals_conceded ? current_user.draw + 1u64 : current_user.draw,
            loss: goals_scored < goals_conceded ? current_user.loss + 1u64 : current_user.loss,
            
            // Update goals scored and conceded
            goals_scored: current_user.goals_scored + goals_scored,
            goals_conceded: current_user.goals_conceded + goals_conceded
        });
    }
}