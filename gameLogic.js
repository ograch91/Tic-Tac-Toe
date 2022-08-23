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
      updateWinner(winner);
      winEffect(line);
      return winner;
    }
  }

  const numOfPlays = moves.filter(i => i).length;
  if (numOfPlays === 9) {
    winner = 'tie';
    updateWinner(winner);
    return 'tie';
  }
};

const winEffect = line => {
  for (const squareNum of line) {
    squaresArr[squareNum].querySelector('div').classList.add('win');
  }
};
