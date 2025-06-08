// Variables to store game state
let board = Array(9).fill(null); // 3x3 board
let currentPlayer = "X"; // "X" or "O"
let players = [];
let scores = { X: 0, O: 0 }; // Track scores for X and O
let round = 0;

// DOM Elements
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startGameBtn = document.getElementById("startGame");
const boardElement = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const scoreboard = document.getElementById("scoreboard");
const playerTurnElement = document.getElementById("playerTurn");
const scoresElement = document.getElementById("scores");
const winnerElement = document.getElementById("winner");
const playAgainBtn = document.getElementById("playAgain");
const partyBlast = document.getElementById("partyBlast");

// Start Game
startGameBtn.addEventListener("click", () => {
  const player1 = player1Input.value.trim();
  const player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Both players must enter their names!");
    return;
  }

  players = [player1, player2];
  resetGame();
});

// Reset Game for a New Match
function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  round = 0;
  scores = { X: 0, O: 0 };

  document.querySelector(".player-names").classList.add("hidden");
  boardElement.classList.remove("hidden");
  scoreboard.classList.remove("hidden");
  winnerElement.classList.add("hidden");
  playAgainBtn.classList.add("hidden");
  partyBlast.classList.add("hidden");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
  });
  updateScoreboard();
}

// Update the scoreboard and turn indicator
function updateScoreboard() {
  playerTurnElement.textContent = `Current Turn: ${
    currentPlayer === "X" ? players[0] : players[1]
  } (${currentPlayer})`;
  scoresElement.textContent = `${players[0]} (X): ${scores.X} | ${players[1]} (O): ${scores.O}`;
}

// Handle Cell Click
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.getAttribute("data-index"));

    // Ignore if the cell is already taken
    if (board[index]) return;

    // Mark the cell and update the board
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase(), "taken");

    // Check for a winner
    const winner = checkWinner();
    if (winner) {
      scores[winner]++;
      round++;
      announceWinner(
        `${currentPlayer === "X" ? players[0] : players[1]} (${currentPlayer}) wins this round!`
      );
      return;
    }

    // Check for a draw
    if (!board.includes(null)) {
      round++;
      announceWinner("This round is a draw!");
      return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateScoreboard();
  });
});

// Check if there's a winner
function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
// Announce the winner and display popups
function announceWinner(message) {
    winnerElement.textContent = message;
    winnerElement.classList.remove("hidden");
  
    if (round >= 3) {
      const finalWinner =
        scores.X > scores.O
          ? `${players[0]} (X)`
          : scores.X < scores.O
          ? `${players[1]} (O)`
          : "No one (It's a tie!)";
  
      winnerElement.textContent += `\n🎉 Game Over! Congratulations ${finalWinner}! 🎉`;
      playAgainBtn.classList.remove("hidden");
      partyBlastEffect(true); // Colorful popups for final win
    } else {
      partyBlastEffect();
      setTimeout(() => {
        board = Array(9).fill(null);
        cells.forEach((cell) => {
          cell.textContent = "";
          cell.className = "cell";
        });
        winnerElement.classList.add("hidden");
        currentPlayer = "X";
        updateScoreboard();
      }, 2000);
    }
  }
  
  // Party Blast Effect with Colorful Popups
  function partyBlastEffect(final = false) {
    partyBlast.classList.remove("hidden");
  
    for (let i = 0; i < (final ? 200 : 100); i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  
      document.body.appendChild(confetti);
  
      setTimeout(() => confetti.remove(), 3000);
    }
  }
  
