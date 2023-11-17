#!/bin/bash
# First check that Leo is installed.
if ! command -v leo &> /dev/null
then
    echo "leo is not installed."
    exit
fi

echo "
We will be playing the role of these two parties:

The private key and address of Player 1.
private_key: APrivateKey1zkpGKaJY47BXb6knSqmT3JZnBUEGBDFAWz2nMVSsjwYpJmm
address: aleo15g9c69urtdhvfml0vjl8px07txmxsy454urhgzk57szmcuttpqgq5cvcdy

The private key and address of Player 2.
private_key: APrivateKey1zkp86FNGdKxjgAdgQZ967bqBanjuHkAaoRe19RK24ZCGsHH
address: aleo1wyvu96dvv0auq9e4qme54kjuhzglyfcf576h0g3nrrmrmr0505pqd6wnry
"

echo "
###############################################################################
########                                                               ########
########                 STEP 1: Initializing Player 1                 ########
########                                                               ########
###############################################################################

echo '
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkpGKaJY47BXb6knSqmT3JZnBUEGBDFAWz2nMVSsjwYpJmm
' > .env
"

echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkpGKaJY47BXb6knSqmT3JZnBUEGBDFAWz2nMVSsjwYpJmm
" > .env


echo "
###############################################################################
########                                                               ########
########         STEP 1: Player 1 creates a new game                   ########
########                                                               ########
###############################################################################

Player 1 creates a game with his team and formation. Player 2 now is allowed to join.

leo run create_game_open '[{id: 0u64, attack: 10u64, defense: 0u64},{id: 0u64, attack: 50u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64}]'
"

full_output=$(leo run create_game_open '[{id: 0u64, attack: 10u64, defense: 0u64},{id: 0u64, attack: 50u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64}]')
echo "$full_output"
output_section=$(echo "$full_output" | sed -n '/➡️  Output/,/Leo ✅ Finished/p')
echo "$output_section"
echo "AVH"
bracket_content=$(echo "$output_section" | sed '/➡️  Output/d' | sed '/Leo ✅ Finished/d' | tr -d '•' | tr -d '\n' | sed 's/  */ /g' | sed 's/^ *//;s/ *$//')
echo "$bracket_content"



echo "
###############################################################################
########                                                               ########
########         STEP 2: Player 2 joins a game                         ########
########                                                               ########
###############################################################################

Player 2 joins a game and selects his formation
"
join_game_command="leo run join_game \"$bracket_content\" \"[{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 50u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 100u64, defense: 100u64},{id: 0u64, attack: 30u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 30u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 30u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64}]\""
echo "$join_game_command"
full_output=$(leo run join_game "$bracket_content" "[{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 50u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 100u64, defense: 100u64},{id: 0u64, attack: 30u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 30u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64},{id: 0u64, attack: 30u64, defense: 0u64},{id: 0u64, attack: 0u64, defense: 0u64}]")
eval $join_game_command