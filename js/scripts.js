//grabbing element references

document.addEventListener('DOMContentLoaded', (event) => {
    let playerName = prompt("What is your name, player?");
    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;

    const diceImages = [
        'Images/dice-six-faces-one.png',
        'Images/inverted-dice-2.png',
        'Images/inverted-dice-3.png',
        'Images/inverted-dice-4.png',
        'Images/inverted-dice-5.png',
        'Images/inverted-dice-6.png'
    ];

    if (!playerName) {
        playerName = "Player";
    }

    const rollButton = document.getElementById('roll-dice');
    const resetButton = document.getElementById('reset-game');
    const resultText = document.getElementById('result-text');
    const gameResultDiv = document.getElementById('game-result');

  

    document.getElementById('player-score').textContent = `${playerName}: ${playerScore}`;

    rollButton.addEventListener('click', rollDice);
    resetButton.addEventListener('click', resetGame);

    function rollDice() {
        if (rounds <= 3) {
            const playerDice1 = rollDie();
            const playerDice2 = rollDie();
            const computerDice1 = rollDie();
            const computerDice2 = rollDie();

            document.getElementById('player-die1').src = diceImages[playerDice1 - 1];
            document.getElementById('player-die2').src = diceImages[playerDice2 - 1];
            document.getElementById('computer-die1').src = diceImages[computerDice1 - 1];
            document.getElementById('computer-die2').src = diceImages[computerDice2 - 1];

            const playerRoundScore = calculateScore(playerDice1, playerDice2);
            const computerRoundScore = calculateScore(computerDice1, computerDice2);

            playerScore += playerRoundScore;
            computerScore += computerRoundScore;

            document.getElementById('player-score').textContent = `${playerName}: ${playerScore}`;
            document.getElementById('computer-score').textContent = `Computer: ${computerScore}`;

            rounds++;

            resultText.innerHTML = `Results:
            <br>${playerName} rolled ${playerDice1} and ${playerDice2} (${playerRoundScore} points).</br>
            <br>Computer rolled ${computerDice1} and ${computerDice2} (${computerRoundScore} points).</br>
            <br>Total scores: ${playerName}: ${playerScore}; Computer: ${computerScore}</br>`;

            if (rounds === 3) {
                setTimeout(showFinalResult, 500);
            }
        }
    }

    function rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function calculateScore(die1, die2) {
        if (die1 === 1 || die2 === 1) {
            return 0;
        } else if (die1 === die2) {
            return (die1 + die2) * 2;
        } else {
            return die1 + die2;
        }
    }

    function showFinalResult() {
        let winner = '';
        if (playerScore > computerScore) {
            winner = `${playerName} wins!`;
        } else if (computerScore > playerScore) {
            winner = 'Computer wins!';
        } else {
            winner = "It's a tie!";
        }
        resultText.textContent = `Game Over! ${winner}`;
        
        fadeIn(resultText);

        gameResultDiv.classList.remove('hidden');
        
        setTimeout(() => {
            resetButton.classList.remove('hidden');
        }, 3000);
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        rounds = 0;
        playerName = prompt("What is your name, player?");
        
        if (!playerName) {
            playerName = "Player";
        }

        document.getElementById('player-score').textContent = `${playerName}: 0`;
        document.getElementById('computer-score').textContent = 'Computer: 0';
        document.getElementById('player-die1').src = diceImages[0];
        document.getElementById('player-die2').src = diceImages[0];
        document.getElementById('computer-die1').src = diceImages[0];
        document.getElementById('computer-die2').src = diceImages[0];

        resultText.textContent = "";
        gameResultDiv.classList.add('hidden');
        resetButton.classList.add('hidden');

        rollButton.disabled = false;
    }
    function fadeIn(element){
        element.style.opacity = 0;

        let opacity = 0;
        const interval = setInterval(function() {
            opacity += 0.2;
            element.style.opacity = opacity;

            if (opacity >= 1){
                clearInterval(interval);
            }
        }, 150);
    }



});
