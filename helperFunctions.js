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
    const quotesArray = [
        {
            quote: 'Frankly, my dear, I don’t give a damn.',
            movie: 'GONE WITH THE WIND',
            year: 1939
        },
        {
            quote: 'I\'m going to make him an offer he can\'t refuse',
            movie: 'THE GODFATHER',
            year: 1972
        },
        {
            quote: `You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.`,
            movie: 'ON THE WATERFRONT',
            year: 1954
        },
        {
            quote: `Toto, I've got a feeling we're not in Kansas
            anymore.`,
            movie: 'THE WIZARD OF OZ',
            year: 1939
        },
        {
            quote: `Here's looking at you, kid.`,
            movie: 'TAXI DRIVER',
            year: 1976
        },
        {
            quote: `You talking to me?`,
            movie: 'TAXI DRIVER',
            year: 1976
        },
        {
            quote: `What we've got here is failure to communicate.`,
            movie: 'COOL HAND LUKE',
            year: 1967
        },
        {
            quote: `Show me the money!`,
            movie: 'JERRY MAGUIRE',
            year: 1996
        },
        {
            quote: `You can't handle the truth!`,
            movie: 'A FEW GOOD MEN',
            year: 1992
        },
        {
            quote: `After all, tomorrow is another day!`,
            movie: 'GONE WITH THE WIND',
            year: 1939
        }];

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