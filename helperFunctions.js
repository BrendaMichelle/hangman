const updateGamePuzzleDisplay = (letter) => {
    let index = 0
    console.log(movieQuoteGameObject.quote);
    console.log(index);


    while (index > -1) {
        index = gameQuote.toLowerCase().indexOf(letter.toLowerCase(), index);

        if (index < 0) {
            break;
        }

        const span = document.querySelector(`span[data-id='${index}']`)
        console.log(span)
        span.textContent = letter.toLowerCase();
        gameQuote = gameQuote.substring(0, index) + '-' + gameQuote.substring(index + 1);
        console.log(gameQuote)
    }
}

const updateWrongGuesses = (letter) => {
    const wrongGuessesDiv = document.querySelector('#guessed-letters');
    const guessesLeftSpan = document.querySelector('#guesses-left-num')

    if (!movieQuoteGameObject.quote.includes(letter) && !wrongGuessesArr.includes(letter)) {
        const guessesLeft = parseInt(guessesLeftSpan.textContent) - 1;
        guessesLeftSpan.textContent = guessesLeft

        wrongGuessesArr.push(letter)
        console.log(wrongGuessesDiv)
        const span = document.createElement('span');
        span.textContent = ` ${letter} `;
        wrongGuessesDiv.append(span);
    }
}

const getRandomQuoteObject = () => {
    return quotesArray[Math.floor(Math.random() * quotesArray.length)];
};

const createStarterPuzzleDisplay = (quote) => {
    const quoteLength = quote.length;
    const puzzleDiv = document.querySelector('#puzzle');
    const quoteDiv = document.createElement('div')
    quoteDiv.id = 'quote-div'

    for (let i = 0; i < quoteLength; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.dataset.id = i;
        letterSpan.textContent = /^[A-Z]$/i.test(quote[i]) ? '___ ' : quote[i];

        if (letterSpan.textContent === ' ') {
            letterSpan.classList.add('space');
        };

        quoteDiv.append(letterSpan);
    };

    puzzleDiv.append(quoteDiv);
    const form = document.querySelector('#guess-form')
    form.style.display = 'block'
};

const addHint = (movieTitle, year) => {
    const hintDiv = document.querySelector('#hint');
    const hintPTag = document.createElement('p');
    hintPTag.textContent = `HINT: ${movieTitle}, ${year}`
    hintDiv.append(hintPTag)
}

const clearPreviousGame = () => {
    const quoteDiv = document.querySelector('div#quote-div')
    const hintDivPTag = document.querySelector('div#hint p')
    if (quoteDiv) {
        quoteDiv.remove();
        hintDivPTag.remove();
    };
}