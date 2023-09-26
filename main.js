const startButton = document.querySelector("#start");
const endButton = document.querySelector("#end");
const scoreBoard = document.querySelector("#score");

// Global Variables
let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
// Creating Random Number
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};
//   Game Controller Function
startGame = () => {
  enableEvents();
  if (rounds >= 3) {
    return endGame;
  }
  const newActive = pickNew(active);
  circles[newActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = newActive;

  timer = setTimeout(startGame, pace);
  pace -= 10;
  rounds++;
  function pickNew(active) {
    // Checking Random Number with active number
    const newActive = getRandom(0, 3);
    if (newActive !== active) {
      return newActive;
    }
    return pickNew(active);
  }
  console.log(active);
};

endGame = () => {
  console.log("Game Ended");
  clearTimeout(timer);
};

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);

// Step 1 Take the circe in
const circles = document.querySelectorAll(".circle");
// Step 2 Create the function
const clickCircle = (i) => {
  if (i !== active) {
    return endGame;
  }
  rounds--;
  score += 10;
  scoreBoard.textContent = `Scoreboard: ${score}`;
};
// Loop and Trigger the Function
// both forEach and for of loop are correct.

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});
/* for (const [i,item] of circles.entries()) {
  item.addEventListener("click", () => clickCircle(i));
} */
