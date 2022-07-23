'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, playing, activePlayer, currentScoreVar;

const init = function () {
  // starting condtions
  scores = [0, 0]; // we can not do score = [1,2]🤢🤢
  currentScoreVar = 0;
  playing = true;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  //switch the current player
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScoreVar = 0; // if not done than next player score will be added from the player1 account
  0;
  activePlayer = activePlayer === 0 ? 1 : 0; //if i am player1 than change to player 2
  // toggle method in classList
  //    (.)it will add the class if it is not there and if it is there, it will remove it, okay.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 generating a random dice
    const rollDice = Math.trunc(Math.random() * 6 + 1);
    console.log(rollDice);

    // 2 display the dice
    if (diceEl.classList.contains('hidden')) {
      diceEl.classList.remove('hidden');
    }
    // (.) manuplating the source attribute by the JS
    diceEl.src = `dice-${rollDice}.png`;

    // 3 check for rolled 1 :if true than switch to next player
    if (rollDice !== 1) {
      //add rollDice to current score
      currentScoreVar += rollDice;
      // select the score element dynamically based on which is the active player right now,
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScoreVar;
    } else {
      switchPlayer();
    }
  }
});

// hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1 Add current score to active player final scoreboard
    scores[activePlayer] += currentScoreVar;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2 check if final scoreboard >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // 3 switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// (.) JS will remove the class even if it is not there
// (.) if there is already a class name then classList.add has no problem in adding the class again . it will not add the again that class and also will not give any error
