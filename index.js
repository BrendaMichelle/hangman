/**
 * @author: Michelle Rios
 */
const movieButton = document.querySelector('#new-movie-game-button');
const customButton = document.querySelector('#new-custom-game-button');
const guessForm = document.querySelector('#guess-form');
const customForm = document.querySelector('#custom-game-form')
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
        // need check if letter is in OG phrase, then if it's in game quote return , else update
        if (strippedLowerCaseGameQuote.includes(strippedLowerCaseGuess)) {
            if (gameQuote.toLowerCase().includes(strippedLowerCaseGuess)) {
                updateGameBoardDisplay(guessInput);
                checkWinCondition(originalGameObject.quote);
            }
            else { // letter has already been guessed
                console.log('already guessed')
                return;
            }
        }

        else {
            updateWrongGuesses(guessInput, strippedLowerCaseGuess, strippedLowerCaseGameQuote);
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
    showCustomGameForm();
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


customForm.addEventListener('submit', (event) => {
    event.preventDefault();
    initiateNewGame(event.target.phrase.value, event.target.hint.value, event.target.guesses.value);
    event.target.reset();
});

movieButton.addEventListener('click', handleMovieButtonClick);
customButton.addEventListener('click', handleCustomButtonClick);
guessForm.addEventListener('submit', handleGuessForm);