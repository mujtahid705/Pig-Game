"use strict";

const score0DOM = document.querySelector("#score--0");
const score1DOM = document.querySelector("#score--1");
const diceDOM = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0DOM = document.querySelector("#current--0");
const currentScore1DOM = document.querySelector("#current--1");
const player0DOM = document.querySelector(".player--0");
const player1DOM = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScore0DOM.textContent = 0;
  currentScore1DOM.textContent = 0;
  score0DOM.textContent = 0;
  score1DOM.textContent = 0;

  player0DOM.classList.remove("player--winner");
  player1DOM.classList.remove("player--winner");
  player0DOM.classList.add("player--active");
  player1DOM.classList.remove("player--active");

  diceDOM.classList.add("hidden");
}
init();

function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1DOM.classList.toggle("player--active");
  player0DOM.classList.toggle("player--active");
}

btnRoll.addEventListener("click", () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceDOM.classList.remove("hidden");
    diceDOM.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
      diceDOM.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
