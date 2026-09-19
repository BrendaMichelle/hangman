/**
 * @author: Michelle Rios
 */
const movieButton = document.querySelector('#new-movie-game-button');
const customButton = document.querySelector('#new-custom-game-button');
const guessForm = document.querySelector('#guess-form');
const customForm = document.querySelector('#custom-game-form')
const guessesDiv = document.querySelector('#wrong-guesses-div');
const howToPlayButton = document.querySelector('#how-to-play-button');
let guessesLeft = 7;
let gameOver = false; 
let originalGameObject = null; // the untouched quote and hint for the current game
let gameQuote = ''; // working copy of the quote; solved letters are replaced with '-'
let wrongGuessesArr = []; // compressed guesses already counted against the player


const handleGuessForm = event => {
    event.preventDefault();

    if (gameOver) { // the win/loss dialog is on its way, so stop accepting guesses
        return;
    }

    const guessInput = event.target[0].value;
    const strippedLowerCaseGuess = compress(guessInput);
    const strippedLowerCaseGameQuote = compress(originalGameObject.quote);
    guessForm.reset();
    focusGuessField();

    if (!strippedLowerCaseGuess || !/[a-z]/.test(strippedLowerCaseGuess)) {
        showGuessStatus('Letters only.');
    }
    else if (strippedLowerCaseGuess.length > 1) { // if they're attempting to solve the whole phrase
        if (strippedLowerCaseGameQuote === strippedLowerCaseGuess) {
            gameOver = true;
            winGame();
        }
        else {
            showGuessStatus(`"${guessInput}" isn't the phrase.`, 'bad');
            updateWrongGuesses(guessInput, strippedLowerCaseGuess);
        }
    }
    else { // their guess is one letter
        const letter = guessInput.toUpperCase();

        if (wrongGuessesArr.includes(strippedLowerCaseGuess)) {
            showGuessStatus(`You already tried ${letter}.`);
        }
        else if (strippedLowerCaseGameQuote.includes(strippedLowerCaseGuess)) {
            if (gameQuote.toLowerCase().includes(strippedLowerCaseGuess)) {
                clearGuessStatus();
                updateGameBoardDisplay(guessInput);
                checkWinCondition();
            }
            else { // letter is already showing up on the board
                showGuessStatus(`${letter} is already up there.`);
            }
        }
        else {
            showGuessStatus(`No ${letter} in this one.`, 'bad');
            updateWrongGuesses(guessInput, strippedLowerCaseGuess);
        }
    }
}


const handleMovieButtonClick = _ => {
    startMovieGame();
}

const handleCustomButtonClick = _ => {
    startCustomGame();
}


const initiateNewGame = (phrase = null, hint = null, numOfGuesses = 7) => {
    originalGameObject = phrase ? { quote: phrase, hint: hint } : Object.assign({}, getRandomQuoteObject());
    gameQuote = phrase ? phrase : originalGameObject.quote;
    wrongGuessesArr = [];
    guessesLeft = Number(numOfGuesses);
    gameOver = false;
    clearPreviousGame();
    createStarterPuzzleDisplay(gameQuote);
    if (hint) {
        addHint(hint);
    }
    else {
        addHint(originalGameObject);
    }

    focusGuessField({ onStart: true });
}


customForm.addEventListener('submit', (event) => {
    event.preventDefault();
    initiateNewGame(event.target.phrase.value, event.target.hint.value, Number(event.target.guesses.value));
    event.target.reset();
});

howToPlayButton.addEventListener('click', toggleInstructions);
movieButton.addEventListener('click', handleMovieButtonClick);
customButton.addEventListener('click', handleCustomButtonClick);
guessForm.addEventListener('submit', handleGuessForm);