const startButton = document.querySelector('#start');
const endButton = document.querySelector('#end');
const scoreBoard = document.querySelector('#score');
const overlay = document.querySelector('.overlay');
const closeX = document.querySelector('.close');
// Global Variables
let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
let mySound;
let playSound;
// Creating Random Number
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Step 1 Take the circe in
const circles = document.querySelectorAll('.circle');

// Step 2 Create the function
const clickCircle = (i) => {
  if (i !== active) {
    return endGame(); // Call endGame instead of returning the function
  }
  rounds--;
  score += 10;
  scoreBoard.textContent = `Scoreboard: ${score}`;
  mySound.play();
};
// Loop and Trigger the Function
// both forEach and for of loop are correct.

circles.forEach((circle, i) => {
  circle.addEventListener('click', () => clickCircle(i));
});

const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = 'auto';
  });
};
//   Game Controller Function

const startGame = () => {
  enableEvents();
  if (rounds >= 3) {
    return endGame;
  }

  const newActive = pickNew(active);
  circles[newActive].classList.toggle('active');
  circles[active].classList.remove('active');

  mySound = new Audio('click.mp3');
  active = newActive;

  timer = setTimeout(startGame, pace);
  pace -= 20;
  rounds++;
  function pickNew(active) {
    // Checking Random Number with active number
    const newActive = getRandom(0, 3);
    if (newActive !== active) {
      return newActive;
    }
    return pickNew(active);
  }
};
const endGame = () => {
  clearTimeout(timer);
  modalShow();
};

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);

// Sounds Effect
const playStart = () => {
  playSound = new Audio('play.mp3');
  playSound.play();
};
const playEnd = () => {
  playSound = new Audio('play-end.mp3');
  playSound.play();
};

// Show Modal Window
const modalShow = () => {
  const currentScore = document.querySelector('.currentScore');
  overlay.classList.toggle('visible');
  currentScore.textContent = `Your Current Score is ${score}`;
};

const resetGame = () => {
  window.location.reload();
};

closeX.addEventListener('click', resetGame);
overlay.addEventListener('click', resetGame);
