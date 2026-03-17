const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const gameContainer = document.getElementById("game");
const messageDiv = document.getElementById("message");
const board = document.getElementById("board");

let currentPlayer = "X";
let players = {};
let moves = Array(9).fill("");
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

submitBtn.addEventListener("click", () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (!p1 || !p2) return;

  players = { X: p1, O: p2 };

  document.getElementById("player-inputs").style.display = "none";
  gameContainer.style.display = "block";

  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
});

board.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cell")) return;

  const index = Number(e.target.id) - 1;

  if (moves[index] !== "" || !gameActive) return;

  e.target.textContent = currentPlayer;
  moves[index] = currentPlayer;

  if (checkWinner(currentPlayer)) {
    messageDiv.textContent = `${players[currentPlayer]} congratulations you won!`;
    gameActive = false;
    return;
  }

  if (!moves.includes("")) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
});

function checkWinner(player) {
  return winPatterns.some(pattern =>
    pattern.every(i => moves[i] === player)
  );
}