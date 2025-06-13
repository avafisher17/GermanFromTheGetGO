"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

    // Pre-Load Voices
    responsiveVoice.speak("", "Deutsch Male", {volume:0});
    responsiveVoice.speak("", "Deutsch Female", {volume:0});

    const images = [
        {img: "images/lesson1/run.png", question: "_____ rennt.", translation: "_____ runs.", singular: "die Frau", plurl: "die Frauen", correct: "die Frau", correctAnswer:"Die Frau rennt.", correctTrans: "The woman runs."},
        {img: "images/lesson1/sing.png", question: "_____ singen.", translation: "_____ sing.", singular: "die Frau", plurl: "die Frauen", correct: "die Frauen", correctAnswer:"Die Frauen singen.", correctTrans: "The women sing."},
        {img: "images/lesson1/drink.png", question: "Der Junge trinkt _____ Tee.", translation: "The boy drinks _____ of tea.", singular: "die Tasse", plurl: "die Tassen", correct: "die Tasse", correctAnswer:"Der Junge trinkt die Tasse Tee.", correctTrans: "The boy drinks the cup of tea."},
        {img: "images/lesson1/teaset.png", question: "Das Teeservice hat _____.", translation: "The tea set has _____.", singular: "die Tasse", plurl: "die Tassen", correct: "die Tassen", correctAnswer:"Das Teeservice hat die Tassen.", correctTrans: "The tea set has the cups."},
        {img: "images/lesson1/bottle.png", question: "_____ trinkt die Milch.", translation: "_____ drinks the milk.", singular: "die Katze", plurl: "die Katzen", correct: "die Katze", correctAnswer:"Die Katze trinkt die Milch.", correctTrans: "The cat drinks the milk."},
        {img: "images/lesson1/neko_cafe.png", question: "Die Frau liebt _____.", translation: "The woman loves _____.", singular: "die Katze", plurl: "die Katzen", correct: "die Katzen", correctAnswer:"Die Frau liebt die Katzen.", correctTrans: "The woman loves the cats."},
        {img: "images/lesson1/oldhouse.png", question: "_____ ist alt.", translation: "_____ is old.", singular: "das Haus", plurl: "die Häuser", correct: "das Haus", correctAnswer:"Das Haus ist alt.", correctTrans: "The house is old."},
        {img: "images/lesson1/houses.jpg", question: "_____ sind schön.", translation: "_____ are pretty.", singular: "das Haus", plurl: "die Häuser", correct: "die Häuser", correctAnswer:"Die Häuser sind schön.", correctTrans: "The houses are pretty."},
        {img: "images/lesson1/loaf.png", question: "Hier ist _____.", translation: "Here is _____.", singular: "das Brot", plurl: "die Brote", correct: "das Brot", correctAnswer:"Hier ist das Brot.", correctTrans: "Here is the bread."},
        {img: "images/lesson1/panya_man.png", question: "Der Mann hat _____.", translation: "The man has _____.", singular: "das Brot", plurl: "die Brote", correct: "die Brote", correctAnswer:"Der Mann hat die Brote.", correctTrans: "The man has the breads."},
        {img: "images/lesson1/eat.png", question: "_____ isst das Brot.", translation: "_____ eats the bread.", singular: "das Mädchen", plurl: "die Mädchen", correct: "das Mädchen", correctAnswer:"Das Mädchen isst das Brot.", correctTrans: "The girl eats the bread."},
        {img: "images/lesson1/gamergirls.png", question: "_____ spielen ein Videospiel.", translation: "_____ play a videogame.", singular: "das Mädchen", plurl: "die Mädchen", correct: "die Mädchen", correctAnswer:"Die Mädchen spielen ein Videospiel", correctTrans: "The girls play a videogame."},
        {img: "images/lesson1/walk.png", question: "Die Frau und _____ spazieren.", translation: "The woman and _____ take a walk.", singular: "der Hund", plurl: "die Hunde", correct: "der Hund", correctAnswer:"Die Frau und der Hund spazieren.", correctTrans: "The woman and the dog take a walk."},
        {img: "images/lesson1/dogs.png", question: "Die Frauen lieben _____.", translation: "The women love _____.", singular: "der Hund", plurl: "die Hunde", correct: "die Hunde", correctAnswer:"Die Frauen lieben die Hunde.", correctTrans: "The women love the dogs."},
        {img: "images/lesson1/read.png", question: "Die Frau liest _____.", translation: "The woman reads _____.", singular: "das Buch", plurl: "die Bücher", correct: "das Buch", correctAnswer:"Die Frau liest das Buch.", correctTrans: "The woman reads the book."},
        {img: "images/lesson1/librarytruck.png", question: "Das Auto hat _____.", translation: "The car has _____.", singular: "das Buch", plurl: "die Bücher", correct: "die Bücher", correctAnswer:"Das Auto hat die Bücher.", correctTrans: "The car has the books."},
        {img: "images/lesson1/cook.png", question: "_____ kocht das Abendessen.", translation: "_____ cooks dinner.", singular: "der Mann", plurl: "die Männer", correct: "der Mann", correctAnswer:"Der Mann kocht Abendessen.", correctTrans: "The man cooks dinner."},
        {img: "images/lesson1/basketball.png", question: "_____ spielen Basketball.", translation: "_____ play basketball.", singular: "der Mann", plurl: "die Männer", correct: "die Männer", correctAnswer:"Die Männer spielen Basketball.", correctTrans: "The men play basketball."},
        {img: "images/lesson1/pet_nekojarashi.png", question: "_____ spielt mit seinem Haustier.", translation: "_____ plays with his pet.", singular: "der Junge", plurl: "die Jungen", correct: "der Junge", correctAnswer:"Der Junge spielt mit seinem Haustier.", correctTrans: "The boy plays with his pet."},
        {img: "images/lesson1/dodgeball.png", question: "_____ machen Sport.", translation: "_____ are doing sports.", singular: "der Junge", plurl: "die Jungen", correct: "die Jungen", correctAnswer:"Die Jungen machen Sport.", correctTrans: "The boys are doing sports."}
    ];

    // Set Up Audio Effects
    const correctSound = new Audio('images/lesson1/sound_effects/match.mp3');
    correctSound.load();

    // Set Up Voices

    const voices = ["Deutsch Male", "Deutsch Female"];

    function soundOff(audio) {
        const randomIndex = Math.floor(Math.random() * voices.length);
        const selectedVoice = voices[randomIndex];

        responsiveVoice.speak(audio, selectedVoice);
    }

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

    let vocabPic = $("#vocabPic");
    let question = $("#question");
    let translation = $("#translation");
    let answerBox1 = $("#answer1");
    let answerBox2 = $("#answer2");
    let scoreBox = $("#score");
    let score = 0;
    const answerBoxes = [answerBox1, answerBox2]

    // Create Question
    function createQuestion() {
        chosen = chooseImage();

        vocabPic.src = chosen.img;
        question.textContent = chosen.question;
        translation.textContent = chosen.translation;
        usedImages.push(chosen);

        answerBox1.textContent = chosen.singular;
        answerBox2.textContent = chosen.plurl;
    }

    createQuestion();
    let answerChosen = false;
    
    function handleClick(event) {
        const button = event.currentTarget;
        if (chosen.correct == button.textContent) {
            shoot();
            soundOff(chosen.correctAnswer);
            correctSound.play();
            answerChosen = true;
            button.style.border = "10px solid #FDA000";
            button.style.background = "#F8DD85";
            score++;
            scoreBox.textContent = `Score: ${score}`;
            question.textContent = chosen.correctAnswer;
            question.style.color = "#FDA000";
            translation.textContent = chosen.correctTrans;
            translation.style.color = "#FDA000";
            answerBoxes.forEach(button => {
                button.removeEventListener("click", handleClick);
            });
        }
        else {
            button.style.border = "10px solid rgb(243, 107, 107)";
            button.style.background = "rgb(240, 5, 5)";
            question.textContent = chosen.correctAnswer;
            question.style.color = "rgb(240, 5, 5)";
            translation.textContent = chosen.correctTrans;
            translation.style.color = "rgb(240, 5, 5)";
            answerChosen = true;
            answerBoxes.forEach(button => {
                button.removeEventListener("click", handleClick);
            });
        }
    }

    answerBox1.addEventListener("click", handleClick);
    answerBox2.addEventListener("click", handleClick);

    // Set Up Continue Button / End Screen

    const continueButton = $("#continue");
    let congratsMessage = $("#congratsMessage");
    const endScreen = $(".endScreen")
    const toDisappear = $("#toDisappear")

    function revert() {
        answerBoxes.forEach(button => {
                button.style.background = "";
                button.style.border = "";
                button.addEventListener("click", handleClick);
        });
    };
    
    continueButton.addEventListener("click", () => {
        if (usedImages.length == 20) {
            toDisappear.style.display = "none";
            endScreen.style.display = "block";
            if (score > 14) {
                congratsMessage.textContent = "Splendid! You really know your stuff!";
            }
            else if (score > 9) {
                congratsMessage.textContent = "You're learning lots of new words! Keep it up!";
            }
            else if (score > 4) {
                congratsMessage.textContent = "Whew! What a work-out for the brain!";
            }
            else {
                congratsMessage.textContent = "Learning a new language is hard, but keep trying!";
            }
        }
        else if (answerChosen == true) {
            question.style.color = "#000000";
            translation.style.color = "#000000";
            createQuestion();
            revert();
            answerChosen = false;
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
        window.location.href = "lesson1-4.html"
    });

    forwardButton.addEventListener("click", () => {
        window.location.href = "unit1.html"
    });

});
