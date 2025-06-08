// Elements
const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("result");
const playAgainButton = document.getElementById("play-again");
const choiceButtons = document.querySelectorAll(".choices button");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const tiesDisplay = document.getElementById("ties");
const roundsPlayedDisplay = document.getElementById("rounds-played");
const celebrationPopup = document.getElementById("celebration-popup");
const restartGameButton = document.getElementById("restart-game");

// Game Choices and Messages
const choices = ["rock", "paper", "scissors"];
const emojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};
const resultMessages = {
  win: "🎉 You win! Great job!",
  lose: "💀 You lost! Try again!",
  tie: "😐 It's a tie!"
};

// Score Tracking
let wins = 0;
let losses = 0;
let ties = 0;
let roundsPlayed = 0;

// Event Listener for Choices
choiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (roundsPlayed >= 5) return; // Stop if 5 rounds are complete
    const playerChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    displayChoices(playerChoice, computerChoice);
    updateResult(playerChoice, computerChoice);
    updateScoreDisplay();

    if (wins >= 3) {
      showCelebration();
    } else if (roundsPlayed === 5) {
      // If 5 rounds are complete, show final results
      resultDisplay.textContent = wins >= 3
        ? "🎉 You won the match!"
        : "😢 You lost the match. Try again!";
    }
  });
});

// Display Choices
function displayChoices(playerChoice, computerChoice) {
  playerChoiceDisplay.textContent = `You: ${emojis[playerChoice]} ${capitalize(playerChoice)}`;
  computerChoiceDisplay.textContent = `Computer: ${emojis[computerChoice]} ${capitalize(computerChoice)}`;
}

// Determine and Update Result
function updateResult(player, computer) {
  if (player === computer) {
    resultDisplay.textContent = resultMessages.tie;
    ties++;
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    resultDisplay.textContent = resultMessages.win;
    wins++;
  } else {
    resultDisplay.textContent = resultMessages.lose;
    losses++;
  }
  roundsPlayed++;
}

// Update Score Display
function updateScoreDisplay() {
  winsDisplay.textContent = wins;
  lossesDisplay.textContent = losses;
  tiesDisplay.textContent = ties;
  roundsPlayedDisplay.textContent = roundsPlayed;
}

// Celebration Popup
function showCelebration() {
  celebrationPopup.classList.remove("hidden");
  document.querySelector(".game-container").classList.add("hidden"); // Hide main game UI
}

// Restart Game
restartGameButton.addEventListener("click", () => {
  wins = 0;
  losses = 0;
  ties = 0;
  roundsPlayed = 0;
  updateScoreDisplay();
  resultDisplay.textContent = "";
  celebrationPopup.classList.add("hidden");
  document.querySelector(".game-container").classList.remove("hidden");
});

// Capitalize Helper
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
