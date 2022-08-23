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

const clearBoard = () => {
  squaresArr.forEach(s => {
    s.innerText = '';
  });
  moves = [];
  winner = undefined;
};

const printScoresArr = scoreHistory => {
  const tabelContainer = document.querySelector('.score-table');
  for (const scoreObj of scoreHistory) {
    const scoreRow = generateScoreRow(scoreObj);
    tabelContainer.append(scoreRow);
  }
};

const generateScoreRow = scoreObj => {
  const row = document.createElement('div');
  row.classList.add('score-row');

  const playerCol = generateScoreCell('player', '');
  const tieCol = generateScoreCell('tie', '');
  const cpuCol = generateScoreCell('cpu', '');
  const dateCol = generateScoreCell('date', scoreObj.date);

  if (scoreObj.winner == 'x') {
    playerCol.innerText = 'X';
  } else if (scoreObj.winner == 'tie') {
    tieCol.innerText = '*';
  } else if (scoreObj.winner == 'o') {
    cpuCol.innerText = 'O';
  }

  row.append(playerCol, tieCol, cpuCol, dateCol);
  return row;
};

const generateScoreCell = (className, text) => {
  const cell = document.createElement('div');
  cell.classList.add(className);
  cell.innerText = text;
  return cell;
};

const printAllScores = scoreSums => {
  document.querySelector('.player-total').innerText = scoreSums.player;
  document.querySelector('.tie-total').innerText = scoreSums.tie;
  document.querySelector('.cpu-total').innerText = scoreSums.cpu;
};

document.addEventListener('DOMContentLoaded', () => {
  loadLocalHistory();
  if (!scoreHistory) return;
  totalScore(scoreHistory);
  printScoresArr(scoreHistory);
  printAllScores(scoreSums);
});
