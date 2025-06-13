"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

    const nouns = [
        {image: $("#dogPlural"), plural: "die Hunde", pluralImage: "images/lesson1/cards/dogs.png"},
        {image: $("#breadPlural"), plural: "die Brote", pluralImage: "images/lesson1/cards/breads.png"},
        {image: $("#chairPlural"), plural: "die Stühle", pluralImage: "images/lesson1/cards/chairs.png"},
        {image: $("#childPlural"), plural: "die Kinder", pluralImage: "images/lesson1/cards/children.png"},
        {image: $("#manPlural"), plural: "die Männer", pluralImage: "images/lesson1/cards/men.png"},
        {image: $("#housePlural"), plural: "die Häuser", pluralImage: "images/lesson1/cards/houses.png"},
        {image: $("#bookPlural"), plural: "die Bücher", pluralImage: "images/lesson1/cards/books.png"},
        {image: $("#cupPlural"), plural: "die Tassen", pluralImage: "images/lesson1/cards/cups.png"},
        {image: $("#boyPlural"), plural: "die Jungen", pluralImage: "images/lesson1/cards/boys.png"},
        {image: $("#catPlural"), plural: "die Katzen", pluralImage: "images/lesson1/cards/cats.png"},
        {image: $("#womanPlural"), plural: "die Frauen", pluralImage: "images/lesson1/cards/women.png"},
        {image: $("#studentPlural"), plural: "die Studentinnen", pluralImage: "images/lesson1/cards/students.png"},
        {image: $("#carPlural"), plural: "die Autos", pluralImage: "images/lesson1/cards/cars.png"},
        {image: $("#girlPlural"), plural: "die Mädchen", pluralImage: "images/lesson1/cards/girls.png"}
    ];

    const ePlurals = $("#ePlurals");
    const nPlurals = $("#nPlurals");
    const specialPlurals = $("#specialPlurals");
    const umlautSection = $("#umlautSection");

    nPlurals.style.display = "none";
    specialPlurals.style.display = "none";
    umlautSection.style.display = "none";

    const ePluralsButton = $("#ePluralsButton");
    const nPluralsButton = $("#nPluralsButton");
    const specialPluralsButton = $("#specialPluralsButton");
    const umlautButton = $("#umlautButton");

    const homeButton = $("#homeButton");
    const backButton = $("#backButton");
    const forwardButton = $("#forwardButton");

    const voices = ["Deutsch Male", "Deutsch Female"];

    function soundOff(audio) {
        const randomIndex = Math.floor(Math.random() * voices.length);
        const selectedVoice = voices[randomIndex];

        responsiveVoice.speak(audio, selectedVoice);
    }

    ePluralsButton.addEventListener("click", () => {
        ePlurals.style.display = "block";
        nPlurals.style.display = "none";
        specialPlurals.style.display = "none";
        umlautSection.style.display = "none"
    });

    nPluralsButton.addEventListener("click", () => {
        ePlurals.style.display = "none";
        nPlurals.style.display = "block";
        specialPlurals.style.display = "none";
        umlautSection.style.display = "none"
    });

    specialPluralsButton.addEventListener("click", () => {
        ePlurals.style.display = "none";
        nPlurals.style.display = "none";
        specialPlurals.style.display = "block";
        umlautSection.style.display = "none"
    });

    umlautButton.addEventListener("click", () => {
        ePlurals.style.display = "none";
        nPlurals.style.display = "none";
        specialPlurals.style.display = "none";
        umlautSection.style.display = "block"
    });

    nouns.forEach(noun => {
        let nounImage = noun.image.querySelector("img");
        let originalImage = nounImage.src;
        let nounLabel = noun.image.querySelector(".label");
        let originalText = nounLabel.textContent;
        let flipped = false;
        nounImage.addEventListener("click", () => {
            if (!flipped) {
                nounImage.src = noun.pluralImage;
                nounLabel.textContent = noun.plural;
                soundOff(noun.plural);
                flipped = true;
            }
            else {
                nounImage.src = originalImage;
                nounLabel.textContent = originalText;
                soundOff(originalText);
                flipped = false;
            }
        });
    });

    const umlautImages = [
        $("#girlUmlaut"), $("#manUmlaut"), $("#birdUmlaut"), $("#sonUmlaut"), $("#bookUmlaut"), $("#chairUmlaut"), $("#footUmlaut")
    ];

    umlautImages.forEach(image => {
        let pic = image.querySelector("img");
        let label = image.querySelector(".label");
        pic.addEventListener("click", () => {
            soundOff(label.textContent);
        });
    });

    homeButton.addEventListener("click", () => {
        window.location.href = "unit1.html"
    });

    backButton.addEventListener("click", () => {
        window.location.href = "lesson1-3.html"
    });

    forwardButton.addEventListener("click", () => {
        window.location.href = "lesson1-5.html"
    });

});