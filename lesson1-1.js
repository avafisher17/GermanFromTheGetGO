"use strict";

const $ = selector => document.querySelector(selector);

const derBox = $("#der");
const dieBox = $("#die");
const dasBox = $("#das");

dieBox.style.display = ("none");
dasBox.style.display = ("none");

const derButton = $("#derButton");
const dieButton = $("#dieButton");
const dasButton = $("#dasButton");

const homeButton = $("#homeButton");
const backButton = $("#backButton");
const forwardButton = $("#forwardButton");

const voices = ["Deutsch Male", "Deutsch Female"];

function soundOff(audio) {
  const randomIndex = Math.floor(Math.random() * voices.length);
  const selectedVoice = voices[randomIndex];

  responsiveVoice.speak(audio, selectedVoice);
}

derButton.addEventListener("click", () => {
    soundOff("der");
    derBox.style.display = ("block");
    dieBox.style.display = ("none");
    dasBox.style.display = ("none");
});

dieButton.addEventListener("click", () => {
    soundOff("die");
    derBox.style.display = ("none");
    dieBox.style.display = ("block");
    dasBox.style.display = ("none");
});

dasButton.addEventListener("click", () => {
    soundOff("das");
    derBox.style.display = ("none");
    dieBox.style.display = ("none");
    dasBox.style.display = ("block");
});

homeButton.addEventListener("click", () => {
    window.location.href = "unit1.html"
});

backButton.addEventListener("click", () => {
    window.location.href = "unit1.html"
});

forwardButton.addEventListener("click", () => {
    window.location.href = "lesson1-2.html"
});