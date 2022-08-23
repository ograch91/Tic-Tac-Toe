const formatDate = (date, format) => {
  return format
    .replace('mm', date.getMonth() + 1)
    .replace('yy', date.getFullYear())
    .replace('dd', date.getDate());
};

let scoreHistory = [];

const saveLocalHistory = scoreHistory => {
  const str = JSON.stringify(scoreHistory);
  localStorage.setItem('scoreHistory', str);
};

const clearLocalHistory = () => {
  localStorage.removeItem('scoreHistory');
};

const loadLocalHistory = () => {
  const str = localStorage.getItem('scoreHistory');
  if (!str) return;
  scoreHistory = JSON.parse(str);
  return scoreHistory;
};

const updateWinner = winner => {
  const today = new Date();
  const date = formatDate(today, 'dd/mm/yy');
  const winObj = { winner, date };
  scoreHistory.push(winObj);
  saveLocalHistory(scoreHistory);
  printScoresArr([winObj]);
  if (winner == 'x') {
    scoreSums.player++;
  } else if (winner == 'tie') {
    scoreSums.tie++;
  } else if (winner == 'o') {
    scoreSums.cpu++;
  }
  printAllScores(scoreSums);
};

const scoreSums = {
  player: 0,
  tie: 0,
  cpu: 0,
};
const totalScore = scoreHistory => {
  scoreSums.player = scoreHistory.filter(i => i.winner == 'x').length;
  scoreSums.tie = scoreHistory.filter(i => i.winner == 'tie').length;
  scoreSums.cpu = scoreHistory.filter(i => i.winner == 'o').length;
};

const clearScores = () => {
  const reload = confirm('Reset everything?\n This will reload the page');
  if (reload) {
    clearLocalHistory();
    window.location.reload();
  }
};
