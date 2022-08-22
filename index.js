document.addEventListener('DOMContentLoaded', () => {
  generateBoard();
});
const squaresArr = [];

const generateBoard = () => {
  const boardDiv = document.querySelector('.board');
  for (let i = 0; i < 3; i++) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row');

    for (let j = 0; j < 3; j++) {
      const squareDiv = generateSquare(i, j);
      squareDiv.innerText = '';
      squareDiv.addEventListener('click', handleClickPlay);
      rowContainer.append(squareDiv);
      squaresArr.push(squareDiv);
    }
    boardDiv.append(rowContainer);
  }
};

const generateSquare = (i, j) => {
  const squareDiv = document.createElement('div');
  squareDiv.classList.add('square');
  squareDiv.id = 's' + (i * 3 + j);

  if (i == 0) {
    squareDiv.classList.add('top');
  }
  if (i == 2) {
    squareDiv.classList.add('bottom');
  }
  if (j == 0) {
    squareDiv.classList.add('left');
  }
  if (j == 2) {
    squareDiv.classList.add('right');
  }

  return squareDiv;
};

const playTurn = (player, squareNum) => {
  const play = document.createElement('div');
  play.classList.add(player);
  const square = squaresArr[squareNum];
  square.append(play);
  moves[squareNum] = player;
};

let moves = [];
let winner;

const handleClickPlay = e => {
  if (winner) {
    clearBoard();
    return;
  }

  const square = e.currentTarget;
  const userPlay = square.id.at(1);
  console.log(square);
  if (moves[userPlay]) {
    console.log('played');
    return;
  }
  playTurn('x', userPlay);
  const playerWin = checkIfGameEnd();
  if (playerWin) {
    return;
  }

  const emptys = getEmptySquares();
  const cpuPlay = getRandomItem(emptys);

  playTurn('o', cpuPlay);
  const cpuWin = checkIfGameEnd();
  if (cpuWin) {
    return;
  }
};

const clearBoard = () => {
  squaresArr.forEach(s => {
    s.innerText = '';
  });
  moves = [];
  winner = undefined;
};


const getRandomItem = items => {
  //https://stackoverflow.com/a/5915122/18308054
  return items[Math.floor(Math.random() * items.length)];
};

const getEmptySquares = () => {
  const emptys = [];
  for (let i = 0; i < 9; i++) {
    if (!moves[i]) {
      emptys.push(i);
    }
  }
  return emptys;
};

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkIfGameEnd = () => {
  for (const line of winLines) {
    const lineMoves = line.map(squareNum => moves[squareNum]);
    if (lineMoves.includes(undefined)) continue;
    if (lineMoves[0] == lineMoves[1] && lineMoves[1] == lineMoves[2]) {
      winner = lineMoves[0];
      delayedAlert(`${winner},win`);
      return winner;
    }
  }

  if (moves.filter(i => i).length === 9) {
    delayedAlert('tie');
    winner = 'tie';
    return 'tie';
  }
};

const delayedAlert = msg => {
  setTimeout(() => alert(msg), 1);
};
