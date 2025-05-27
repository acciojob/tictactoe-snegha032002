//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const gameContainer = document.getElementById("game");
const messageDiv = document.getElementById("message");
const board = document.getElementById("board");
let currentPlayer = "X";
let players = {};
let moves = Array(9).fill(null);
let gameActive = true;

// Winning combinations
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Submit button handler
submitBtn.addEventListener("click", () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (!p1 || !p2) {
    alert("Please enter names for both players.");
    return;
  }

  players = { X: p1, O: p2 };
  currentPlayer = "X";
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  document.getElementById("player-inputs").style.display = "none";
  gameContainer.style.display = "block";
});

// Handle cell click
board.addEventListener("click", (e) => {
  const target = e.target;
  const cellIndex = parseInt(target.id) - 1;

  if (!gameActive || target.className !== "cell" || moves[cellIndex]) {
    return;
  }

  target.textContent = currentPlayer;
  moves[cellIndex] = currentPlayer;

  if (checkWinner(currentPlayer)) {
    messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
    gameActive = false;
    return;
  }

  if (moves.every(cell => cell)) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
});

// Check if current player won
function checkWinner(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => moves[index] === player)
  );
}
