const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
// console.log(cells);
initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);

  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  // console.log(this);
  const cellIndex = this.getAttribute("cellIndex");
  //   console.log(cellIndex);
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}


function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const cellA = options[condition[0]];
    console.log(options[condition[0]]);
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") continue;
    if (cellA == cellB && cellC == cellB) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer}'s win`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Dram!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent="");
    running =true;
}
