"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

    // Pre-Load Voices
    responsiveVoice.speak("", "Deutsch Male", {volume:0});
    responsiveVoice.speak("", "Deutsch Female", {volume:0});

    const images = [
        {img: "images/lesson1/baugettes.png", word: "das Brot", answer: "the bread"}, {img: "images/lesson1/raisinbread.png", word: "das Brot", answer: "the bread"},
        {img: "images/lesson1/textbook.png", word: "das Buch", answer: "the book"}, {img: "images/lesson1/brownbook.png", word: "das Buch", answer: "the book"},
        {img: "images/lesson1/babygirl.png", word: "das Mädchen", answer: "the girl"}, {img: "images/lesson1/hopscotch.png", word: "das Mädchen", answer: "the girl"},
        {img: "images/lesson1/redhouse.png", word: "das Haus", answer: "the house"}, {img: "images/lesson1/brownhouse.png", word: "das Haus", answer: "the house"},
        {img: "images/lesson1/flapper.png", word: "die Frau", answer: "the woman"}, {img: "images/lesson1/mom.png", word: "die Frau", answer: "the woman"},
        {img: "images/lesson1/cup.png", word: "die Tasse", answer: "the cup"}, {img: "images/lesson1/lemonteacup.png", word: "die Tasse", answer: "the cup"},
        {img: "images/lesson1/grumpycat.png", word: "die Katze", answer: "the cat"}, {img: "images/lesson1/browncat.png", word: "die Katze", answer: "the cat"},
        {img: "images/lesson1/manoffice.png", word: "der Mann", answer: "the man"}, {img: "images/lesson1/cowboy.png", word: "der Mann", answer: "the man"},
        {img: "images/lesson1/roombadog.png", word: "der Hund", answer: "the dog"}, {img: "images/lesson1/fatdog.png", word: "der Hund", answer: "the dog"},
        {img: "images/lesson1/playcar.png", word: "der Junge", answer: "the boy"}, {img: "images/lesson1/bars.png", word: "der Junge", answer: "the boy"}
    ];

    // Set Up Audio Effects
    const correctSound = new Audio('images/lesson1/sound_effects/match.mp3');
    correctSound.load();

    let vocabPic = $("#vocabPic");
    let vocabWord = $("#vocabWord");
    let message = $("#question");
    const answerBoxes = [$("#answer1"), $("#answer2"), $("#answer3"), $("#answer4")];
    let scoreBox = $("#score");
    let score = 0;
    let chosen;
    const usedImages = [];

    function chooseImage() {
        let randomIndex1 = Math.floor(Math.random() * images.length);
        let chosen = images[randomIndex1];
        if (usedImages.includes(chosen)) {
            return chooseImage();
        }
        return chosen;
    }

     // Set Up Voices

    const voices = ["Deutsch Male", "Deutsch Female"];

    function soundOff(audio) {
        const randomIndex = Math.floor(Math.random() * voices.length);
        const selectedVoice = voices[randomIndex];

        responsiveVoice.speak(audio, selectedVoice);
    }

    vocabWord.addEventListener("click", () => {
            soundOff(chosen.word);
    });

    // Create Question
    function createQuestion() {
        chosen = chooseImage();

        soundOff(chosen.word);

        vocabPic.src = chosen.img;
        vocabWord.textContent = chosen.word;
        usedImages.push(chosen);

        let randomIndex2 = Math.floor(Math.random() * answerBoxes.length)
        let correctBox = answerBoxes[randomIndex2];
        correctBox.textContent = chosen.answer;

        const correctIndex = answerBoxes.indexOf(correctBox);
        let wrongBoxes = answerBoxes.filter((_, index) => index !== correctIndex);

        let usedAnswers = [chosen.answer];

        for (let x = 0; x < wrongBoxes.length; x++) {
            let tryAgain = true;
            
            while (tryAgain == true) {
                let randomIndex3 = Math.floor(Math.random() * images.length);
                let candidateAnswer = images[randomIndex3].answer;
                if (!usedAnswers.includes(candidateAnswer)) {
                    wrongBoxes[x].textContent = candidateAnswer;
                    usedAnswers.push(candidateAnswer);
                    tryAgain = false;
                }
            }
        }
    }

    createQuestion();

    let firstTry = true;
    let correctSelected = false;
    
    function handleClick(event) {
        const button = event.currentTarget;
        if (firstTry == true && chosen.answer == button.textContent) {
            shoot();
            correctSound.play();
            button.style.border = "10px solid #FDA000";
            button.style.background = "#F8DD85";
            correctSelected = true;
            score++;
            scoreBox.textContent = `Score: ${score}`;
            message.textContent = `Correct, "${chosen.word}" means "${button.textContent}"!`;
            message.style.color = "#FDA000";
            
            answerBoxes.forEach(button => {
                button.removeEventListener("click", handleClick);
            });
        }
        else if (firstTry == false && chosen.answer == button.textContent) {
            correctSound.play();
            correctSelected = true;
            button.style.border = "10px solid #FDA000";
            button.style.background = "#F8DD85";
            message.textContent = `That's it, "${chosen.word}" means "${button.textContent}"!`;
            message.style.color = "#FDA000";

            answerBoxes.forEach(button => {
                button.removeEventListener("click", handleClick);
            });
        }
        else {
            firstTry = false;
            button.style.border = "10px solid #000000";
            button.style.background = "#FFFFFF";
            message.textContent = `Not quite! Give it another go.`;
            message.style.color = "#FF0000";
        }
    }

    answerBoxes.forEach(button => {
        button.addEventListener("click", handleClick);
    });

    // Set Up Continue Button / End Screen

    const continueButton = $("#continue");
    let congratsMessage = $("#congratsMessage");
    const endScreen = $(".endScreen")
    const toDisappear = $("#toDisappear")

    continueButton.addEventListener("click", () => {
        if (usedImages.length == 20 && correctSelected == true) {
            toDisappear.style.display = "none";
            endScreen.style.display = "block";
            if (score > 14) {
                congratsMessage.textContent = "Splendid! You really know your stuff!"
            }
            else if (score > 9) {
                congratsMessage.textContent = "You're learning lots of new words! Keep it up!"
            }
            else if (score > 4) {
                congratsMessage.textContent = "Whew! What a work-out for the brain!"
            }
            else {
                congratsMessage.textContent = "Learning a new language is hard, but keep trying!"
            }
        }
        else if (correctSelected == true) {
            firstTry = true;
            message.textContent = "What does this word mean?"
            message.style.color = "#000000"
            createQuestion();
            correctSelected = false;
            answerBoxes.forEach(button => {
                button.style.background = "";
                button.style.border = "";
                button.addEventListener("click", handleClick);
            });
        }
        else {
            return;
        } 
    });


    // Set Up Correct Answer Animation
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
    const homeButton = $("#homeButton");
    const backButton = $("#backButton");
    const forwardButton = $("#forwardButton");

    homeButton.addEventListener("click", () => {
        window.location.href = "unit1.html"
    });

    backButton.addEventListener("click", () => {
        window.location.href = "lesson1-1.html"
    });

    forwardButton.addEventListener("click", () => {
        window.location.href = "lesson1-3.html"
    });

});
