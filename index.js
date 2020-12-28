const button = document.querySelector('#new-game-button')
const guessForm = document.querySelector('#guess-form')

button.addEventListener('click', (event) => {
    initiateNewGame();
});

guessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const letterGuess = event.target[0].value;
    if (letterGuess.length > 1) {
        alert("You can only guess one letter at a time.");
    }
    else if (! /^[A-Z]$/i.test(letterGuess)) {
        alert("Guesses can only be letters.");
    }
    else {
        if (gameQuote.includes(letterGuess)) {
            updateGamePuzzleDisplay(letterGuess);
        }
        else {
            updateWrongGuesses(letterGuess);
        }
    }
    event.target.reset();
})



const initiateNewGame = () => {
    movieQuoteGameObject = Object.assign({}, getRandomQuoteObject());
    gameQuote = movieQuoteGameObject.quote;
    wrongGuessesArr = [];
    clearPreviousGame();
    createStarterPuzzleDisplay(movieQuoteGameObject.quote);
    addHint(movieQuoteGameObject.movie, movieQuoteGameObject.year);
};


