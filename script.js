const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg-container');
const msgText = document.getElementById('msg');
const newBtn = document.getElementById('new-btn');
const resetBtn = document.getElementById('reset-btn');
const modeSelect = document.getElementById('mode-select');  // Dropdown to choose mode

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isComputer = false;  // To track if it's computer vs player

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check for a winner
function checkWinner() {
  for (let [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      msgText.textContent = `Congratulations! ${currentPlayer} Wins!`;
      msgContainer.classList.add('show');
      return;
    }
  }

  // Check for draw
  if (!board.includes('')) {
    gameActive = false;
    msgText.textContent = "It's a Draw!";
    msgContainer.classList.add('show');
  }
}

// Handle box click
function handleBoxClick(index) {
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;

  // Check for winner before switching player
  checkWinner();

  // Switch to the other player after the check
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isComputer && currentPlayer === 'O') {
      setTimeout(computerMove, 500);  // Simulate a delay for computer's move
    }
  }
}

// Computer makes a move
function computerMove() {
  if (!gameActive) return;

  // Simple AI: pick the first available spot
  const emptyBoxes = board.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);
  const randomMove = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

  board[randomMove] = 'O';
  boxes[randomMove].textContent = 'O';

  checkWinner();

  if (gameActive) {
    currentPlayer = 'X';
  }
}

// Reset game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  boxes.forEach(box => box.textContent = '');
  msgContainer.classList.remove('show');
}

// Change game mode
function setGameMode() {
  const mode = modeSelect.value;
  isComputer = mode === 'computer';
  resetGame();
}

// New game button click
newBtn.addEventListener('click', resetGame);

// Reset button click
resetBtn.addEventListener('click', resetGame);

// Select mode change event
modeSelect.addEventListener('change', setGameMode);

// Add click event listeners to each box
boxes.forEach((box, index) => {
  box.addEventListener('click', () => handleBoxClick(index));
});
