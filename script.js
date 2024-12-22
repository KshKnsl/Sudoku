const initialPage = document.getElementById('initial-page');
const gameContainer = document.getElementById('game-container');
const winnerPage = document.getElementById('winner-page');
const sudokuGrid = document.getElementById('sudoku-grid');
const numberPad = document.getElementById('number-pad');
const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const solveBtn = document.getElementById('solve-btn');
const hintBtn = document.getElementById('hint-btn');
const timerDisplay = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
const dateDisplay = document.getElementById('date');
const winDateDisplay = document.getElementById('win-date');

let timer;
let seconds = 0;
let selectedCell = null;
let puzzle = [];
let solution = [];

function showCurrentDate() {
    const today = new Date();
    const dateString = today.toDateString();
    dateDisplay.textContent = dateString;
    winDateDisplay.textContent = dateString;
}

function hideInitialPage() {
    initialPage.style.display = 'none';
    gameContainer.style.display = 'block';
}

function showWinnerPage() {
    gameContainer.style.display = 'none';
    winnerPage.style.display = 'flex';
}

function generateSudoku(difficulty) {
    // This is a placeholder function. In a real implementation, you would use a more sophisticated
    // algorithm to generate valid Sudoku puzzles with varying difficulties.
    const base = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
    ];

    let numToRemove;
    switch(difficulty) {
        case 'easy':
            numToRemove = 30;
            break;
        case 'medium':
            numToRemove = 40;
            break;
        case 'hard':
            numToRemove = 50;
            break;
        default:
            numToRemove = 30;
    }

    puzzle = JSON.parse(JSON.stringify(base));
    solution = JSON.parse(JSON.stringify(base));

    for (let i = 0; i < numToRemove; i++) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        while (puzzle[row][col] === 0) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        }
        puzzle[row][col] = 0;
    }
}

function renderGrid() {
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            if (puzzle[i][j] !== 0) {
                cell.textContent = puzzle[i][j];
                cell.classList.add('prefilled');
            }
            cell.addEventListener('click', () => selectCell(cell));
            sudokuGrid.appendChild(cell);
        }
    }
}

function renderNumberPad() {
    numberPad.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => fillCell(i));
        numberPad.appendChild(button);
    }
    const eraseButton = document.createElement('button');
    eraseButton.textContent = 'Erase';
    eraseButton.addEventListener('click', () => fillCell(0));
    numberPad.appendChild(eraseButton);
}

function selectCell(cell) {
    if (cell.classList.contains('prefilled')) return;
    if (selectedCell) selectedCell.classList.remove('selected');
    selectedCell = cell;
    selectedCell.classList.add('selected');
}

function fillCell(num) {
    if (!selectedCell || selectedCell.classList.contains('prefilled')) return;
    selectedCell.textContent = num === 0 ? '' : num;
    const row = parseInt(selectedCell.dataset.row);
    const col = parseInt(selectedCell.dataset.col);
    puzzle[row][col] = num;
}

function startGame() {
    hideInitialPage();
    clearInterval(timer);
    seconds = 0;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
    generateSudoku(difficultySelect.value);
    renderGrid();
}

function updateTimer() {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${secs}`;
    seconds++;
}

function checkSolution() {
    let correct = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = sudokuGrid.children[i * 9 + j];
            if (puzzle[i][j] !== solution[i][j]) {
                cell.classList.add('incorrect');
                correct = false;
            } else {
                cell.classList.remove('incorrect');
            }
        }
    }
    if (correct) {
        clearInterval(timer);
        showWinnerPage();
    } else {
        showModal('Not quite right', 'Keep trying, you can do it!');
    }
}

function solvePuzzle() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            puzzle[i][j] = solution[i][j];
            const cell = sudokuGrid.children[i * 9 + j];
            cell.textContent = solution[i][j];
        }
    }
}

function getHint() {
    if (!selectedCell) return;
    const row = parseInt(selectedCell.dataset.row);
    const col = parseInt(selectedCell.dataset.col);
    selectedCell.textContent = solution[row][col];
    puzzle[row][col] = solution[row][col];
}

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '🔇';
    }
}

startBtn.addEventListener('click', startGame);
checkBtn.addEventListener('click', checkSolution);
solveBtn.addEventListener('click', solvePuzzle);
hintBtn.addEventListener('click', getHint);
modalClose.addEventListener('click', () => modal.style.display = 'none');
musicToggle.addEventListener('click', toggleMusic);

showCurrentDate();
renderNumberPad();

// Start the game after a short delay to show the initial page
setTimeout(hideInitialPage, 4000);

