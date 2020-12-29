const movieButton = document.querySelector('#new-movie-game-button');
const customButton = document.querySelector('#new-custom-game-button');
const guessForm = document.querySelector('#guess-form');
const guessesDiv = document.querySelector('#wrong-guesses-div');
let guessesLeft = 7;

movieButton.addEventListener('click', (event) => {
    initiateNewGame();
});

customButton.addEventListener('click', (event) => {
    clearPreviousGame();

    if (!document.querySelector('#custom-game-form')) {
        const newContainer = document.querySelector('#new-container');
        const form = document.createElement('form');
        form.id = 'custom-game-form'

        const guessLabel = document.createElement('label');
        guessLabel.textContent = 'Enter the limit of guesses:'
        const guessLimitInput = document.createElement('input');
        guessLimitInput.type = 'number';
        guessLimitInput.value = 7;
        guessLimitInput.max = 26;
        guessLimitInput.min = 1;
        guessLimitInput.name = 'guess';
        guessLabel.htmlFor = 'guess';

        const phraseLabel = document.createElement('label');
        phraseLabel.textContent = 'Enter the phrase or word:'
        const phraseInput = document.createElement('input');
        phraseInput.type = 'text';
        phraseInput.name = 'phrase';
        phraseLabel.htmlFor = 'phrase';

        const hintLabel = document.createElement('label');
        hintLabel.textContent = 'Enter a hint or category:'
        const hintInput = document.createElement('input');
        hintInput.type = 'text';
        hintInput.name = 'hint';
        hintLabel.htmlFor = 'hint';

        const submitInput = document.createElement('input');
        submitInput.type = 'submit';

        form.append(guessLabel, guessLimitInput, phraseLabel, phraseInput, hintLabel, hintInput, submitInput);
        newContainer.append(form);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            guessesLeft = guessLimitInput.value;
            initiateNewGame(phraseInput.value, hintInput.value);
        })
    }
});

guessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const letterGuess = event.target[0].value;
    guessForm.reset();
    if (letterGuess.length > 1) {
        alert("You can only guess one letter at a time.");
    }
    else if (! /^[A-Z]$/i.test(letterGuess)) {
        alert("Guesses can only be letters.");
    }
    else {
        if (gameQuote.toLowerCase().includes(letterGuess.toLowerCase())) {
            updateGamePuzzleDisplay(letterGuess);
        }
        else {
            updateWrongGuesses(letterGuess);
        }
    }
    
});

const initiateNewGame = (phrase = null, hint = null) => {
    originalGameObject = phrase ? { quote: phrase, hint: hint } : Object.assign({}, getRandomQuoteObject());
    gameQuote = phrase ? phrase : originalGameObject.quote;
    wrongGuessesArr = [];

    clearPreviousGame();
    createStarterPuzzleDisplay(gameQuote);
    if (hint) {
        addHint(hint);
    }
    else {
        addHint(originalGameObject);
    }
}


