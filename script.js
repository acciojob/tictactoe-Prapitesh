//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (player1 === "" || player2 === "") return;

  playerForm.classList.add("hide");
  game.classList.remove("hide");

  currentPlayer = player1;
  message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || gameOver) return;

    const index = cell.id - 1;
    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      message.textContent = `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    currentSymbol = currentSymbol === "x" ? "o" : "x";
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return true;
    }
  }
  return false;
}
