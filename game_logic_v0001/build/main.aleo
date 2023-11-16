import leaderboard.aleo;
program game_logic_v0001.aleo;


struct Player:
    id as u64;
    attack as u64;
    defense as u64;

record gameStruct:
    owner as address.private;
    opponent as address.private;
    goals_1 as u64.private;
    goals_2 as u64.private;
    game_finished as boolean.private;

record game_state:
    owner as address.public;
    opponent as address.public;
    formation_1 as [Player; 11u32].private;
    formation_2 as [Player; 11u32].private;
    goals_1 as u64.public;
    goals_2 as u64.public;
    game_finished as boolean.public;


function main:
    input r0 as boolean.private;


function xabc:
    input r0 as field.private;
    output true as boolean.private;


function create_game_private:
    input r0 as [Player; 11u32].private;
    input r1 as address.private;
    cast self.caller r1 r0 r0 0u64 0u64 false into r2 as game_state.record;
    output r2 as game_state.record;


function create_game_open:
    input r0 as [Player; 11u32].private;
    cast self.caller self.caller r0 r0 0u64 0u64 false into r1 as game_state.record;
    output r1 as game_state.record;


function join_game:
    input r0 as game_state.record;
    input r1 as [Player; 11u32].private;
    not r0.game_finished into r2;
    assert.eq r2 true;
    cast r0.owner self.caller r0.formation_1 r1 r0.goals_1 r0.goals_1 false into r3 as game_state.record;
    output r3 as game_state.record;


function play_game:
    input r0 as game_state.record;
    gt r0.formation_1[0u32].attack r0.formation_2[0u32].defense into r1;
    add 0u64 1u64 into r2;
    ternary r1 r2 0u64 into r3;
    gt r0.formation_2[0u32].attack r0.formation_1[0u32].defense into r4;
    add 0u64 1u64 into r5;
    ternary r4 r5 0u64 into r6;
    gt r0.formation_1[1u32].attack r0.formation_2[1u32].defense into r7;
    add r3 1u64 into r8;
    ternary r7 r8 r3 into r9;
    gt r0.formation_2[1u32].attack r0.formation_1[1u32].defense into r10;
    add r6 1u64 into r11;
    ternary r10 r11 r6 into r12;
    gt r0.formation_1[2u32].attack r0.formation_2[2u32].defense into r13;
    add r9 1u64 into r14;
    ternary r13 r14 r9 into r15;
    gt r0.formation_2[2u32].attack r0.formation_1[2u32].defense into r16;
    add r12 1u64 into r17;
    ternary r16 r17 r12 into r18;
    gt r0.formation_1[3u32].attack r0.formation_2[3u32].defense into r19;
    add r15 1u64 into r20;
    ternary r19 r20 r15 into r21;
    gt r0.formation_2[3u32].attack r0.formation_1[3u32].defense into r22;
    add r18 1u64 into r23;
    ternary r22 r23 r18 into r24;
    gt r0.formation_1[4u32].attack r0.formation_2[4u32].defense into r25;
    add r21 1u64 into r26;
    ternary r25 r26 r21 into r27;
    gt r0.formation_2[4u32].attack r0.formation_1[4u32].defense into r28;
    add r24 1u64 into r29;
    ternary r28 r29 r24 into r30;
    gt r0.formation_1[5u32].attack r0.formation_2[5u32].defense into r31;
    add r27 1u64 into r32;
    ternary r31 r32 r27 into r33;
    gt r0.formation_2[5u32].attack r0.formation_1[5u32].defense into r34;
    add r30 1u64 into r35;
    ternary r34 r35 r30 into r36;
    gt r0.formation_1[6u32].attack r0.formation_2[6u32].defense into r37;
    add r33 1u64 into r38;
    ternary r37 r38 r33 into r39;
    gt r0.formation_2[6u32].attack r0.formation_1[6u32].defense into r40;
    add r36 1u64 into r41;
    ternary r40 r41 r36 into r42;
    gt r0.formation_1[7u32].attack r0.formation_2[7u32].defense into r43;
    add r39 1u64 into r44;
    ternary r43 r44 r39 into r45;
    gt r0.formation_2[7u32].attack r0.formation_1[7u32].defense into r46;
    add r42 1u64 into r47;
    ternary r46 r47 r42 into r48;
    gt r0.formation_1[8u32].attack r0.formation_2[8u32].defense into r49;
    add r45 1u64 into r50;
    ternary r49 r50 r45 into r51;
    gt r0.formation_2[8u32].attack r0.formation_1[8u32].defense into r52;
    add r48 1u64 into r53;
    ternary r52 r53 r48 into r54;
    gt r0.formation_1[9u32].attack r0.formation_2[9u32].defense into r55;
    add r51 1u64 into r56;
    ternary r55 r56 r51 into r57;
    gt r0.formation_2[9u32].attack r0.formation_1[9u32].defense into r58;
    add r54 1u64 into r59;
    ternary r58 r59 r54 into r60;
    gt r0.formation_1[10u32].attack r0.formation_2[10u32].defense into r61;
    add r57 1u64 into r62;
    ternary r61 r62 r57 into r63;
    gt r0.formation_2[10u32].attack r0.formation_1[10u32].defense into r64;
    add r60 1u64 into r65;
    ternary r64 r65 r60 into r66;
    call leaderboard.aleo/update_score r0.owner r63 r66 into r67;
    call leaderboard.aleo/update_score r0.opponent r66 r63 into r68;
    cast r0.owner r0.opponent r0.formation_1 r0.formation_2 r63 r66 true into r69 as game_state.record;
    async play_game r67 r68 into r70;
    output r69 as game_state.record;
    output r70 as game_logic_v0001.aleo/play_game.future;

finalize play_game:
    input r0 as leaderboard.aleo/update_score.future;
    input r1 as leaderboard.aleo/update_score.future;
    await r0;
    await r1;
