let color = {
  red: '',
  green: '',
  blue: ''
};

let initSize = 4;
let score = 0;
let highScore = 0;

function createGrid(size) {
  generateRandomColor();

  const grid = document.getElementById("grid");
  grid.style["grid-template"] = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  grid.innerHTML = "";

  let diffElem = getRandomInt(0, (size * size) - 1);

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.id = `item${i}`;
    div.classList.add("item");
    div.style.background = getColor();

    div.addEventListener("click", (event) => {
      if (event.target.id === `item${diffElem}`) {
        createGrid(size + 1);
        updateScore(score + 1);
      }
      else {
        grid.classList.add("shake");
        setTimeout(() => {
          grid.classList.remove("shake");
          createGrid(initSize);
        }, 850);
        updateHighScore();
        initScore();
      }
    });
    grid.appendChild(div);
  }

  const diffElement = document.getElementById(`item${diffElem}`);
  diffElement.style.background = getShade(0.75);
  document.querySelector('body').style.background = getShade(0.1);
}

function updateScore(updatedScore) {
  score = updatedScore;
  const scoreTag = document.getElementById("score");
  scoreTag.innerHTML = score;
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    renderHighScore();
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum and the minimum are inclusive
}

function generateRandomColor() {
  color.red = getRandomInt(0, 255);
  color.green = getRandomInt(0, 255);
  color.blue = getRandomInt(0, 255);
}

function getColor() {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;

}

function getShade(percentage) {
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${percentage})`;
}

function startGame() {
  createGrid(initSize);
  initHighScore();
  initScore();
  document.getElementById("scores").hidden = false;
  document.querySelector("footer").hidden = false;
}

function initScore() {
  score = 0;
  updateScore(0);
}

function initHighScore() {
  const localHighScore = localStorage.getItem("highScore");

  if (localHighScore) {
    highScore = localHighScore;
  }

  renderHighScore();
}

function renderHighScore() {
  const highScoreTag = document.getElementById("highScore");
  highScoreTag.innerHTML = highScore ? highScore : "-";
}

startGame();