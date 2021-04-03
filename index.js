/**
 * @author: Michelle Rios
 */
const movieButton = document.querySelector('#new-movie-game-button');
const customButton = document.querySelector('#new-custom-game-button');
const guessForm = document.querySelector('#guess-form');
const guessesDiv = document.querySelector('#wrong-guesses-div');
let guessesLeft = 7; // default allowed # of guesses


const handleGuessForm = event => {
    event.preventDefault();
    const guessInput = event.target[0].value;
    const strippedLowerCaseGuess = compress(guessInput);
    const strippedLowerCaseGameQuote = compress(originalGameObject.quote);
    guessForm.reset();

    if (!strippedLowerCaseGuess || parseInt(strippedLowerCaseGuess) || strippedLowerCaseGuess === '0') { // if their guess isn't a letter
        swal("Guesses can only be letters.");
    }
    else if (strippedLowerCaseGuess.length > 1) { // if they're attempting to solve the whole phrase
        if (strippedLowerCaseGameQuote === strippedLowerCaseGuess) {
            winGame(guessInput);
        }
        else {
            updateWrongGuesses(strippedLowerCaseGuess);
            swal(`Your guess, "${guessInput}", is not correct!`);
        }
    }
    else { // their guess is one letter
        if (gameQuote.toLowerCase().includes(guessInput.toLowerCase())) {
            updateGameBoardDisplay(guessInput);
            checkWinCondition(originalGameObject.quote);
        }
        else {
            updateWrongGuesses(guessInput);
        }
    }
}


const handleMovieButtonClick = _ => {
    initiateNewGame();
    hideInstructions();
}

const handleCustomButtonClick = _ => {
    clearPreviousGame();
    hideInstructions();
    if (!document.querySelector('#custom-game-form')) {
        const newContainer = document.querySelector('#new-container');
        const form = document.createElement('form');
        form.id = 'custom-game-form'
        form.classList.add('div-pink-shadow', 'pink-modal', 'center')

        const guessLabel = document.createElement('label');
        guessLabel.textContent = 'Enter the limit of wrong guesses:'
        const guessLimitInput = document.createElement('input');
        guessLimitInput.type = 'number';
        guessLimitInput.value = 7;
        guessLimitInput.max = 26;
        guessLimitInput.min = 1;
        guessLimitInput.name = 'guess';
        guessLimitInput.required = true;
        guessLabel.htmlFor = 'guess';

        const phraseLabel = document.createElement('label');
        phraseLabel.textContent = 'Enter the phrase or word:'
        const phraseInput = document.createElement('input');
        phraseInput.type = 'text';
        phraseInput.name = 'phrase';
        phraseInput.required = true;
        phraseLabel.htmlFor = 'phrase';

        const hintLabel = document.createElement('label');
        hintLabel.textContent = 'Enter a hint or category:'
        const hintInput = document.createElement('input');
        hintInput.type = 'text';
        hintInput.name = 'hint';
        hintInput.required = true;
        hintLabel.htmlFor = 'hint';

        const submitInput = document.createElement('input');
        submitInput.type = 'submit';

        form.append(guessLabel, guessLimitInput, phraseLabel, phraseInput, hintLabel, hintInput, submitInput);
        newContainer.append(form);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            initiateNewGame(phraseInput.value, hintInput.value, guessLimitInput.value);
            form.reset();
        });
    }
}


const initiateNewGame = (phrase = null, hint = null, numOfGuesses = 7) => {
    originalGameObject = phrase ? { quote: phrase, hint: hint } : Object.assign({}, getRandomQuoteObject()); // global
    gameQuote = phrase ? phrase : originalGameObject.quote; // global
    wrongGuessesArr = [];
    guessesLeft = numOfGuesses;
    clearPreviousGame();
    createStarterPuzzleDisplay(gameQuote);
    if (hint) {
        addHint(hint);
    }
    else {
        addHint(originalGameObject);
    }
}


movieButton.addEventListener('click', handleMovieButtonClick);
customButton.addEventListener('click', handleCustomButtonClick);
guessForm.addEventListener('submit', handleGuessForm);