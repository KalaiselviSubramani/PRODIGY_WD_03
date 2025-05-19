const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let cells = [];
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  gameState.fill('');
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push(cell);

    cell.addEventListener('click', () => handleMove(i));
  }

  message.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleMove(index) {
  if (!gameActive || gameState[index] !== '') return;

  gameState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(i => gameState[i] === currentPlayer);
  });
}

resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
});

// Initialize game
createBoard();
