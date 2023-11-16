program leaderboard.aleo {
    struct User {
        score: u64,
        win: u64,
        draw: u64,
        loss: u64,
        goals_scored: u64,
        goals_conceded: u64
    }

    mapping users: field => User;

    transition update_score(user_id: field, goals_scored: u64, goals_conceded: u64) {
        assert_eq(self.caller, self.signer);
        return then finalize(user_id, goals_scored, goals_conceded);
    }

    finalize update_score(user_id: field, goals_scored: u64, goals_conceded: u64) {
        let current_user: User = Mapping::get_or_use(users, user_id, User {
            score: 0u64,
            win: 0u64,
            draw: 0u64,
            loss: 0u64,
            goals_scored: 0u64,
            goals_conceded: 0u64
        });

        Mapping::set(users, user_id, User {
            // Win is 3 points, draw is 1 point
            score: goals_scored > goals_conceded ? current_user.score + 3u64 : (goals_scored == goals_conceded ? current_user.score + 1u64 : current_user.score),

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