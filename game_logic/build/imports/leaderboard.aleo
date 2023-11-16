program leaderboard.aleo;

struct User:
    score as u64;
    played as u64;
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
    cast 0u64 0u64 0u64 0u64 0u64 0u64 0u64 into r3 as User;
    get.or_use users[r0] r3 into r4;
    gt r1 r2 into r5;
    add r4.score 3u64 into r6;
    is.eq r1 r2 into r7;
    add r4.score 1u64 into r8;
    ternary r7 r8 r4.score into r9;
    ternary r5 r6 r9 into r10;
    add r4.played 1u64 into r11;
    gt r1 r2 into r12;
    add r4.win 1u64 into r13;
    ternary r12 r13 r4.win into r14;
    is.eq r1 r2 into r15;
    add r4.draw 1u64 into r16;
    ternary r15 r16 r4.draw into r17;
    lt r1 r2 into r18;
    add r4.loss 1u64 into r19;
    ternary r18 r19 r4.loss into r20;
    add r4.goals_scored r1 into r21;
    add r4.goals_conceded r2 into r22;
    cast r10 r11 r14 r17 r20 r21 r22 into r23 as User;
    set r23 into users[r0];
