"use strict";

const cards = [
  {img: 'images/lesson1/cards/dasbuch.png', color: '#8B4513', audio: 'das Buch'}, {img: 'images/lesson1/cards/book.png', color: '#8B4513'},
  {img: 'images/lesson1/cards/dasbrot.png', color: '#000000', audio: 'das Brot'}, {img: 'images/lesson1/cards/bread.png', color: '#000000'},
  {img: 'images/lesson1/cards/dashaus.png', color: '#FF69B4', audio: 'das Haus'}, {img: 'images/lesson1/cards/house.png', color: '#FF69B4'},
  {img: 'images/lesson1/cards/dasmaedchen.png', color: '#FF4C4C', audio: 'das Maedchen'}, {img: 'images/lesson1/cards/girl.png', color: '#FF4C4C'},
  {img: 'images/lesson1/cards/diefrau.png', color: '#0F1AF3', audio: 'die Frau'}, {img: 'images/lesson1/cards/woman.png', color: '#0F1AF3'}, 
  {img: 'images/lesson1/cards/dietasse.png', color: '#C300FF', audio: 'die Tasse'}, {img: 'images/lesson1/cards/cup.png', color:'#C300FF'},
  {img: 'images/lesson1/cards/diekatze.png', color: '#FFA500', audio: 'die Katze'}, {img: 'images/lesson1/cards/cat.png', color: '#FFA500'},
  {img: 'images/lesson1/cards/dermann.png', color: '#ECFF3D', audio: 'der Mann'}, {img: 'images/lesson1/cards/man.png',  color: '#ECFF3D'},
  {img: 'images/lesson1/cards/derjunge.png', color: '#FF00FF', audio: 'der Junge'}, {img: 'images/lesson1/cards/boy.png', color: '#FF00FF'},
  {img: 'images/lesson1/cards/derhund.png', color: '#00FFFF', audio: 'der Hund'}, {img: 'images/lesson1/cards/dog.png', color: '#00FFFF'}
];

// Set Up Game Board
const board = document.getElementById('game-board');
let gameStarted = false;
let flippedCards = [];
let lockBoard = false;
let revealedCards = [];
let guessCount = 0;

// Set Up Audio Effects
const matchSound = new Audio('images/lesson1/sound_effects/match.mp3');
matchSound.load();

const voices = ["Deutsch Male", "Deutsch Female"];

function soundOff(audio) {
  const randomIndex = Math.floor(Math.random() * voices.length);
  const selectedVoice = voices[randomIndex];

  responsiveVoice.speak(audio, selectedVoice);
}

// Set Up Game Statistics
const playButton = document.getElementById('playButton');
const guessLabel = document.createElement('button');
guessLabel.id = 'guessLabel';
const timer = document.createElement('button');
timer.id = 'timer';

// Set Up Timer
let secondsElapsed = 0;
let minutesElapsed = 0;
let stopwatch = null;

function startStopwatch() {
  if (stopwatch) {
    clearInterval(stopwatch);
  }

  secondsElapsed = 0;
  minutesElapsed = 0;
  timer.textContent = `Time: ${minutesElapsed}m, ${secondsElapsed.toString().padStart(2, '0')}s`;

  stopwatch = setInterval(() => {
    secondsElapsed++;
    
    if (secondsElapsed == 60){
      minutesElapsed++;
      secondsElapsed = 0;
    }

    timer.textContent = `Time: ${minutesElapsed}m, ${secondsElapsed.toString().padStart(2, '0')}s`;
  }, 1000);
}

// Main Game Mechanics
function createBoard(cardCount) {
  board.innerHTML = '';
  flippedCards = [];
  revealedCards = [];
  lockBoard = false;
  
  // Set Up Card Grid
  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    board.appendChild(card);
  }

  // Card Mechanics
  const cardElements = document.querySelectorAll('.card');

  cards.forEach((card, index) => {
      const cardElement = cardElements[index];
      cardElement.dataset.img = card.img;
      cardElement.dataset.color = card.color;
      if (card.audio) {
        cardElement.dataset.audio = card.audio;
      }

      // Flipping Cards
      cardElement.addEventListener('click', () => {
        if (lockBoard || flippedCards.includes(cardElement) || revealedCards.includes(cardElement)) {
            return;
        } 

        const imageToShow = cardElement.dataset.img;
        cardElement.style.backgroundImage = `url(${imageToShow})`;

        flippedCards.push(cardElement);

        if (cardElement.dataset.audio) {
          soundOff(cardElement.dataset.audio); // (Plays audio if selected card contains German words)
        }
        
        if (flippedCards.length === 2) { // (Locks board so that player can't select more than 2 cards at a time)
          lockBoard = true;
          guessCount++;
          guessLabel.textContent = `Guesses: ${guessCount}`;

          if (flippedCards[0].dataset.color === flippedCards[1].dataset.color) { // (For matching cards) 
            flippedCards[0].style.borderRadius = '12px';
            flippedCards[1].style.borderRadius = '12px';
            flippedCards[0].style.border = `4px solid ${card.color}`;
            flippedCards[1].style.border = `4px solid ${card.color}`;
            matchSound.currentTime = 0;
            matchSound.play();
            revealedCards.push(flippedCards[0]);
            revealedCards.push(flippedCards[1]);
            flippedCards = [];
            lockBoard = false;

            if (revealedCards.length === cards.length) { // (Winning upon clearing the board)
              shoot();
              let h3 = document.querySelector('h3');
              h3.textContent = 'Congratulations! You found all the matches.';
              h3.style.color = '#FDA000';
              guessLabel.style.border = '7px solid #FDA000'
              timer.style.border = '7px solid #FDA000'
              clearInterval(stopwatch);
            }
          } 
          else { // (For mismatched cards)
            setTimeout(() => {
              flippedCards.forEach(cardElement => {
                cardElement.style.backgroundImage = `url('images/lesson1/cards/blank.png')`;
              });
              flippedCards = [];
              lockBoard = false;
            }, 1500);
          }
        }
      });
  });
}

// Start Button
playButton.addEventListener('click', () => {
  let shuffle = cards.sort(() => 0.5 - Math.random());

  let h3 = document.querySelector('h3');
  h3.textContent = 'Match the word with its correct picture!';
  h3.style.color = '#000000'

  guessCount = 0;
  guessLabel.textContent = `Guesses: ${guessCount}`;
  guessLabel.style.border = '7px solid #3DA33B'
              
  secondsElapsed = 0;
  minutesElapsed = 0;
  startStopwatch();
  timer.style.border = '7px solid #3DA33B'

  // Change to Reset Button Upon Game's Start
  if (gameStarted == false) {
    playButton.textContent = 'RESET';
    createBoard(20);
    soundOff('Lass uns gehen!');    
    guessLabel.textContent = `Guesses: ${guessCount}`;
    playButton.parentNode.insertBefore(guessLabel, playButton);
    guessLabel.insertAdjacentElement('afterend', timer);
    gameStarted = true;
  }
  else {
    board.innerHTML = '';
    createBoard(20);
  }
});

// Set Up Winning Animation
function shoot() {
  confetti({
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    particleCount: 40,
    scalar: 1.2,
    shapes: ['star']
  });
};

// Set Up Navigation Buttons
const homeButton = document.getElementById("homeButton");
const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");

homeButton.addEventListener("click", () => {
  window.location.href = "unit1.html"
});

backButton.addEventListener("click", () => {
  window.location.href = "lesson1-2.html"
});

forwardButton.addEventListener("click", () => {
    window.location.href = "lesson1-4.html"
});
