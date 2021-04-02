/**
 * Strips the input string of all punctuation and spaces
 * 
 * @param {string} string The quote/phrase to be modified
 * @returns {(string|null)} The modified string or null if it doesn't contain any letters
 */
const compress = (string) => {
    const arr = string.match(/\w/g)

    if (arr) {
        return arr.join("").toLowerCase();
    }
    else {
        return null;
    }
}


/**
 * Replaces the underscores in the game board with the letter.
 *
 * @param {char} letter The letter to fill in.
 */
const updateGameBoardDisplay = (letter) => {
    let index = 0

    while (index > -1) {
        index = gameQuote.toLowerCase().indexOf(letter.toLowerCase(), index);

        if (index < 0) {
            break;
        }

        const span = document.querySelector(`span[data-id='${index}']`)
        span.textContent = gameQuote[index];
        gameQuote = gameQuote.substring(0, index) + '-' + gameQuote.substring(index + 1);
    }
    checkWinCondition();
}

const winGame = () => {
    alert("You solved the puzzle!");
    clearPreviousGame();
}

const checkWinCondition = () => {
    // check to see if gameQuote string has any letters left. (If all letters have been guessed, the string will only contain dashes '-')
    if (!/[a-zA-Z]/g.test(gameQuote)) {
        setTimeout(function () {
            winGame();
        }, 500);
    }
}

/**
 * Tracks the incorrectly guessed letter and displays it on the website.
 *
 * @param {char} guess The incorrect compressed guess.
 */
const updateWrongGuesses = (guess) => {
    const lowerCaseGuess = guess.toLowerCase();
    const wrongGuessesDiv = document.querySelector('#guessed-letters');
    const guessesLeftSpan = document.querySelector('#guesses-left-num');

    if (!compress(originalGameObject.quote).includes(guess) && !wrongGuessesArr.includes(lowerCaseGuess)) {
        guessesLeft -= 1;
        guessesLeftSpan.textContent = guessesLeft;

        wrongGuessesArr.push(lowerCaseGuess)
        const span = document.createElement('span');
        span.textContent = ` ${guess} `;
        wrongGuessesDiv.append(span);
    }

    checkLoseCondition();
}

const checkLoseCondition = () => {
    if (guessesLeft < 1) {
        setTimeout(function () {
            alert(`Game Over. The phrase was: 
        ${originalGameObject.quote}`);
            clearPreviousGame();
        }, 500);
    }
}

const getRandomQuoteObject = () => {
    return quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

/**
 * Create an underscore for each letter in the quote/phrase to make the game board display. Display
 * the form for submitting guesses and the div containing information about guesses.
 * @param {string} quote The quote/phrase that the user will be guessing.
 */
const createStarterPuzzleDisplay = (quote) => {
    const quoteLength = quote.length;
    const gameDiv = document.querySelector('#game-div')
    const puzzleDiv = document.querySelector('#game-board-container');
    const boardDisplay = document.createElement('div');
    boardDisplay.id = 'game-board-display-div';
    const guessesLeftSpan = document.querySelector('#guesses-left-num');
    guessesLeftSpan.textContent = guessesLeft;

    for (let i = 0; i < quoteLength; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.dataset.id = i;
        letterSpan.className = "placeholder"
        letterSpan.textContent = /^[A-Z]$/i.test(quote[i]) ? '_ ' : quote[i];

        if (letterSpan.textContent === ' ') {
            letterSpan.classList.add('space');
        }
        boardDisplay.append(letterSpan);
    }


    puzzleDiv.style.maxWidth = quoteLength * 10 < 800 ? `${quoteLength * 10}px` : 800;
    puzzleDiv.append(boardDisplay);
    gameDiv.style.display = 'block'
}

const addHint = (hint) => {
    const hintDiv = document.querySelector('#hint');
    const hintPTag = document.createElement('p');
    hintPTag.textContent = typeof hint === "object" ? `HINT: ${hint.movie}, ${hint.year}` : `HINT: ${hint}`;
    hintDiv.append(hintPTag)
}

/**
 * Undisplays the div containing the information about the guesses and the form for submitting guesses. Removes the game board display
 * and custom game board form conditionally.
 */
const clearPreviousGame = () => {
    const customGameForm = document.querySelector('#custom-game-form');
    const boardDisplay = document.querySelector('div#game-board-display-div');
    const hintDivPTag = document.querySelector('div#hint p');
    guessesDiv.querySelector('#guesses-left-num').textContent = guessesLeft;
    guessesDiv.querySelector('#guessed-letters').innerHTML = '🚫';
    guessForm.letter.value = '';
    const gameDiv = document.querySelector('#game-div');
    gameDiv.style.display = 'none';

    if (boardDisplay) {
        boardDisplay.remove();
        hintDivPTag.remove();
    }
    if (customGameForm) {
        customGameForm.remove();
    }
}

