const updateGamePuzzleDisplay = (letter) => {
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

const checkWinCondition = () => {
    if (!/[a-zA-Z]/g.test(gameQuote)) {
        setTimeout(function () {
            alert("You solved the puzzle!");
            clearPreviousGame();
        }, 500);
    }
}

const updateWrongGuesses = (letter) => {
    const lowerCaseLetter = letter.toLowerCase();
    const wrongGuessesDiv = document.querySelector('#guessed-letters');
    const guessesLeftSpan = document.querySelector('#guesses-left-num');

    if (!originalGameObject.quote.toLowerCase().includes(lowerCaseLetter) && !wrongGuessesArr.includes(lowerCaseLetter)) {
        guessesLeft -= 1;
        guessesLeftSpan.textContent = guessesLeft;

        wrongGuessesArr.push(lowerCaseLetter)
        const span = document.createElement('span');
        span.textContent = ` ${letter} `;
        wrongGuessesDiv.append(span);
    }
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

const createStarterPuzzleDisplay = (quote) => {
    const quoteLength = quote.length;
    const puzzleDiv = document.querySelector('#puzzle');
    const quoteDiv = document.createElement('div');
    quoteDiv.id = 'quote-div';
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

        quoteDiv.append(letterSpan);
    }

    puzzleDiv.append(quoteDiv);
    const form = document.querySelector('#guess-form')
    form.style.display = 'block'
    guessesDiv.style.display = 'block'
}

const addHint = (hint) => {
    const hintDiv = document.querySelector('#hint');
    const hintPTag = document.createElement('p');
    hintPTag.textContent = typeof hint === "object" ? `HINT: ${hint.movie}, ${hint.year}` : `HINT: ${hint}`;
    hintDiv.append(hintPTag)
}

const clearPreviousGame = () => {
    const customGameForm = document.querySelector('#custom-game-form');
    const quoteDiv = document.querySelector('div#quote-div');
    const hintDivPTag = document.querySelector('div#hint p');
    guessesDiv.querySelector('#guesses-left-num').textContent = 7;
    guessesDiv.querySelector('#guessed-letters').innerHTML = 'Wrong Guessed Letters:';
    guessesDiv.style.display = 'none';
    guessForm.style.display = 'none';

    if (quoteDiv) {
        quoteDiv.remove();
        hintDivPTag.remove();
    }
    if (customGameForm) {
        customGameForm.remove();
    }
}