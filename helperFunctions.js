/**
 * Strips the input string of all punctuation and spaces
 * 
 * @param {string} string The quote/phrase to be modified
 * @returns {(string|null)} The modified string or null if it doesn't contain any letters
 */
const compress = (string) => {
    const arr = string.match(/[a-z0-9]/gi)

    if (arr) {
        return arr.join("").toLowerCase();
    }
    else {
        return null;
    }
}

let guessStatusTimer = null;

/**
 * Shows a quick message under the guess form
 *
 * @param {string} [tone] 'bad' for a wrong guess, otherwise neutral
 */
const showGuessStatus = (message, tone = 'neutral') => {
    const statusEl = document.querySelector('#guess-status');

    if (!statusEl) {
        return;
    }

    statusEl.textContent = message;
    statusEl.dataset.tone = tone;
    clearTimeout(guessStatusTimer);
    guessStatusTimer = setTimeout(() => {
        statusEl.textContent = '';
    }, 2600);
};


const clearGuessStatus = () => {
    clearTimeout(guessStatusTimer);
    const statusEl = document.querySelector('#guess-status');

    if (statusEl) {
        statusEl.textContent = '';
    }
};


/**
 * onStart is skipped on touch so the keyboard doesn't jump up before they've
 * seen the board
 */
const focusGuessField = ({ onStart = false } = {}) => {
    if (gameOver || !guessForm.letter) {
        return;
    }

    if (onStart && !window.matchMedia('(pointer: fine)').matches) {
        return;
    }

    guessForm.letter.focus();
};


/**
 * Shows or hides the instructions and keeps the toggle button in sync
 */
const setInstructionsVisible = (visible) => {
    const panel = document.querySelector('.intro');
    const toggle = document.querySelector('#how-to-play-button');

    panel.classList.toggle('hidden', !visible);

    if (toggle) {
        toggle.setAttribute('aria-expanded', String(visible));
        toggle.textContent = visible ? 'Hide Instructions' : 'How to Play';
    }
}


const hideInstructions = _ => {
    setInstructionsVisible(false);
}


const toggleInstructions = _ => {
    setInstructionsVisible(document.querySelector('.intro').classList.contains('hidden'));
}

const hideCustomGameForm = _ => {
    customForm.classList.add('hidden');
}

const showCustomGameForm = _ => {
    customForm.classList.remove('hidden');
    openCurtain();
}


/**
 * Runs the opening animation. Removing and re-adding the class around a reflow
 * so it replays on every new game
 */
const openCurtain = () => {
    document.body.classList.remove('is-playing');
    void document.body.offsetWidth;
    document.body.classList.add('is-playing');
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
}


const startMovieGame = _ => {
    hideInstructions();
    initiateNewGame();
}


const startCustomGame = _ => {
    hideInstructions();
    clearPreviousGame();
    showCustomGameForm();
}


/**
 * Shows the game over card. The board stays up behind it until they hit "Done"
 *
 * @param {object} options Title, text and icon for the card
 */
const endGame = (options) => {
    swal(Object.assign({}, options, {
        className: 'marquee-lights',
        button: { text: 'Done', value: 'close' }
    })).then(() => {
        clearPreviousGame();
    });
}


/**
 * Fills in the rest of the board. Solving the whole phrase wins without ever
 * touching it, so it needs filling in before the lights go on
 */
const revealWholePuzzle = () => {
    const quote = originalGameObject.quote;

    for (let index = 0; index < quote.length; index++) {
        const span = document.querySelector(`span[data-id='${index}']`);

        if (span) {
            span.textContent = quote[index];
        }
    }

    gameQuote = gameQuote.replace(/[a-zA-Z]/g, '-');
}


// Lights up the board and swaps the guess form for the curtain call
const winGame = () => {
    revealWholePuzzle();
    document.querySelector('#game-stage').classList.add('marquee-lights', 'is-won');
    clearGuessStatus();
}


const checkWinCondition = (quote) => {
    if (gameOver) {
        return;
    }

    // check to see if gameQuote string has any letters left. (If all letters have been guessed, the string will only contain dashes '-')
    if (!/[a-zA-Z]/g.test(gameQuote)) {
        gameOver = true;

        setTimeout(() => {
            winGame();
        }, 500);
    }
}


/**
 * Tracks the incorrect guess and displays it on the website. Callers only get
 * here once the guess is already known to be wrong
 *
 * @param {string} guess The guess as the player typed it.
 * @param {string} compressedGuess The compressed form of the guess, used to detect repeats.
 */
const updateWrongGuesses = (guess, compressedGuess) => {
    const wrongGuessesDiv = document.querySelector('#guessed-letters');
    const guessesLeftSpan = document.querySelector('#guesses-left-num');

    if (!wrongGuessesArr.includes(compressedGuess)) {
        guessesLeft -= 1;
        guessesLeftSpan.textContent = guessesLeft;

        wrongGuessesArr.push(compressedGuess)
        const span = document.createElement('span');
        span.textContent = ` ${guess} `;
        wrongGuessesDiv.append(span);
    }

    checkLoseCondition();
}


const checkLoseCondition = () => {
    if (gameOver) {
        return;
    }

    if (guessesLeft < 1) {
        gameOver = true;

        setTimeout(function () {
            endGame({
                title: 'Game Over.',
                text: `The phrase was: ${originalGameObject.quote}`,
                icon: 'images/towers.png'
            });
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

    let row = 1;

    for (let i = 0; i < quoteLength; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.dataset.id = i;
        letterSpan.className = "placeholder"
        letterSpan.textContent = /^[A-Z]$/i.test(quote[i]) ? '_ ' : quote[i];

        if (letterSpan.textContent === ' ') {
            letterSpan.classList.add('space');

            // logic to create a new row to try to prevent a word from starting on one row and finishing on another
            // will not work if a word is > 20 characters
            if (i / row > 20) {
                const br = document.createElement('br');
                boardDisplay.append(br);
                row += 1;
            }

        }
        boardDisplay.append(letterSpan);
    }

    puzzleDiv.append(boardDisplay);
    gameDiv.style.display = 'block';
    openCurtain();
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
    const boardDisplay = document.querySelector('div#game-board-display-div');
    const hintDivPTag = document.querySelector('div#hint p');
    guessesDiv.querySelector('#guesses-left-num').textContent = guessesLeft;
    guessesDiv.querySelector('#guessed-letters').innerHTML = '';
    guessForm.letter.value = '';
    clearGuessStatus();
    document.querySelector('#game-stage').classList.remove('marquee-lights', 'is-won');
    const gameDiv = document.querySelector('#game-div');
    gameDiv.style.display = 'none';
    document.body.classList.remove('is-playing');
    hideCustomGameForm()

    if (boardDisplay) {
        boardDisplay.remove();
        hintDivPTag.remove();
    }
}

