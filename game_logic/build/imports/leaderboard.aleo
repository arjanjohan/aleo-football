program leaderboard.aleo;

struct User:
    win as u64;
    draw as u64;
    loss as u64;
    goals_scored as u64;
    goals_conceded as u64;


mapping users:
	key as field.public;
	value as User.public;

function update_score:
    input r0 as field.private;
    input r1 as u64.private;
    input r2 as u64.private;
    assert.eq self.caller self.signer;
    async update_score r0 r1 r2 into r3;
    output r3 as leaderboard.aleo/update_score.future;

finalize update_score:
    input r0 as field.public;
    input r1 as u64.public;
    input r2 as u64.public;
    cast 0u64 0u64 0u64 0u64 0u64 into r3 as User;
    get.or_use users[r0] r3 into r4;
    gt r1 r2 into r5;
    add r4.win 1u64 into r6;
    ternary r5 r6 r4.win into r7;
    is.eq r1 r2 into r8;
    add r4.draw 1u64 into r9;
    ternary r8 r9 r4.draw into r10;
    lt r1 r2 into r11;
    add r4.loss 1u64 into r12;
    ternary r11 r12 r4.loss into r13;
    add r4.goals_scored r1 into r14;
    add r4.goals_conceded r2 into r15;
    cast r7 r10 r13 r14 r15 into r16 as User;
    set r16 into users[r0];
