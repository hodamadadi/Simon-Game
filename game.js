/*let gameSeq = [];
let userInput = [];
let gameSeqNo = 0;
let level = 1;

function reset() {
  gameSeq = [];
  userInput = [];
  gameSeqNo = 0;
  level = 0;
}
//the sound
function selectSoundToPlay(Option) {
  let soundpath;
  switch (Option) {
    case 0:
      soundpath = 'sounds/0.mp3';
      break;
    case 1:
      soundpath = 'sounds/1.mp3';
      break;
    case 2:
      soundpath = 'sounds/2.mp3';
      break;
    case 3:
      soundpath = 'sounds/3.mp3';
      break;
    default:
      soundpath = 'sounds/.wrong.mp3';
      break;
  }
  return soundpath;
}
function makeSound(soundpath) {
  let audio = new Audio(soundpath);
  audio.play();
}
//End
function playSound(randomNumber) {
  let tempclass = '.' + randomNumber;
  const path = selectSoundToPlay(randomNumber);
  makeSound(path);
  $(tempclass).animate({
    opacity: '10%',
  });
}
setTimeout(function () {
  $(tempclass).animate({
    opacity: '100%',
  });
}, 200);

function nextSequence() {
  let randomNumber = Math.round(Math.random() * 3);
  gameSeq.push(randomNumber);
  playSound(randomNumber);
}
function postUserClick(seq, userInput) {
  if (seq[gameSeqNo] === userInput) {
    if (gameSeqNo + 1 === seq.length) {
      level = level + 1;
      userInput = [];
      gameSeqNo = 0;

      setTimeout(function () {
        $('#start').text('level' + level);
        playGame();
      }, 2000);
    } else {
      gameSeqNo = gameSeqNo + 1;
      userInput.push(userInput);
    }
  } else {
    $('#start').text('Oops, Wrong Choice!!!');
    reset();
    setTimeout(function () {
      $('#start').text('Start');
      playGame();
    }, 3000);
  }
}
function playGame() {
  console.log('Srart the Game');
  nextSequence();
}
reset();
playGame();

$('.0').click(function () {
  userInput = 0;
  playSound(0);
  Response = postUserClick(gameSeq, userInput);
});
$('.1').click(function () {
  userInput = 1;
  playSound(1);
  Response = postUserClick(gameSeq, userInput);
});
$('.2').click(function () {
  userInput = 2;
  playSound(2);
  Response = postUserClick(gameSeq, userInput);
});
$('.3').click(function () {
  userInput = 3;
  playSound(3);
  Response = postUserClick(gameSeq, userInput);
});

var colorSequence = [];
var clickEndled = true;
var level = 0;
var currentElement = false;
var gameOver = false;

function gameStart() {
  currentElement = 0;
  level++;
  var random = Math.floor(Math.random() * 4);
  clickEndled = false;

  switch (random) {
    case 0:
      colorSequence.push('blue');
      animateButtons('blue');
      addSound('blue');
      break;

    case 1:
      colorSequence.push('yellow');
      animateButtons('yellow');
      addSound('yellow');
      break;
    case 2:
      colorSequence.push('green');
      animateButtons('green');
      addSound('green');
      break;
    case 4:
      colorSequence.push('red');
      animateButtons('red');
      addSound('red');
      break;
  }
}
//sound
function addSound(btn) {
  var audio = new Audio('sound/' + btn + '.mp3');
  arguments.play();
}
//pressed
$('body').keydown(function () {
  if (clickEndled === true) {
    gameStart();
  }
  if (gameOver === true) {
    colorSequence = [];
    clickEndled = true;
    level = 0;
    currentElement = 0;
    gameOver = false;
    $('h1').text('Press A Key to Start');
    console.log(colorSequence);
  }
});
//click event
$('.btn').click(function (event) {
  if (this.id !== colorSequence[currentElement]) {
    addSound('wrong choice!');
    clickEndled = false;
    gameOver = true;
    $('body').addClass('game-over');
    $('h1').text('Game Over,Press any key to restart');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 100);
  } else if (this.id === colorSequence[currentElement]) {
    addSound(this.id);
    animateButtons(this.id);
    currentElement++;
    if (colorSequence.length === currentElement) {
      setTimeout(function () {
        gameStart();
      }, 1000);
    }
  }
});
//add animation to buttons
function animateButtons(color) {
  $('.' + color).removeClass('pressed');

  setTimeout(function () {
    $('.' + color).removeClass('pressed');
  }, 100);
}
*/
let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'Simon Game';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}

function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = 'Wait for the computer';
  heading.textContent = `Level ${level} of 20`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (humanSequence.length === sequence.length) {
    humanSequence = [];
    info.textContent = 'Success! Keep going!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Wait for the computer';
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});
