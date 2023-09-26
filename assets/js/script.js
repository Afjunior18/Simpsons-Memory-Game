// Wait for the page to finish loading before running any JavaScript.

document.addEventListener("DOMContentLoaded", () => {

    //Getting references to HTML elements for later manipulation

    const board = document.getElementById('game-board');
    const timer = document.querySelector('#timer-count');
    const newMatch = document.getElementById('new-match');
    const wrongMatch = document.getElementById('wrong-match');
    const runGame = document.getElementById('start-game');
    const hardButton = document.getElementById('hard-level');

    // Create variable for starting a timer 
    let currentTime = 60;
    let timeInterval;

    // Array to keep track of chosen cards
    let chosenCards = [];

    // Variable to control timer if game is in progressing 
    let gameInProgress = false;

    // Array with all object of cards
    const cards = [

        {
            name: 'Card01',
            img: 'assets/images/bart.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card02',
            img: 'assets/images/bart01.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card03',
            img: 'assets/images/family.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card04',
            img: 'assets/images/homer.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card05',
            img: 'assets/images/lisa.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card06',
            img: 'assets/images/mother.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card01',
            img: 'assets/images/bart.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card02',
            img: 'assets/images/bart01.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card03',
            img: 'assets/images/family.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card04',
            img: 'assets/images/homer.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card05',
            img: 'assets/images/lisa.webp',
            flipped: false,
            matched: false,
            found: false
        },
        {
            name: 'Card06',
            img: 'assets/images/mother.webp',
            flipped: false,
            matched: false,
            found: false
        }

    ];

    // Function to initiate the game on easy level.
    // Shuffles the cards and creates the game board.
    function startEasyGame() {

        // Functions to hide a win and game over message when starts a new game
        hideWinMessage();
        hideOverMessage();

        // Hide the buttons when starts the game
        runGame.style.display = 'none';
        hardButton.style.display = 'none';

        if (!gameInProgress) {

            const shuffledCards = shuffleCards(cards);
            createBoard(shuffledCards);
            resetGame();
            gameInProgress = true; // Game in progressing, starting timer.

            timer.textContent = '60' + 's';

            //Iniate the game with 0 on counter.
            newMatch.textContent = '0';
            wrongMatch.textContent = '0';

            startTimer(60);
        }
    }

    // Function to initiate the game on hard level.
    function startHardGame() {

        hideWinMessage();
        hideOverMessage();
        if (!gameInProgress) {
            const shuffledCards = shuffleCards(cards);
            createBoard(shuffledCards);
            resetGame();
            gameInProgress = true; // Game in progressing, starting timer.

            timer.textContent = '30' + 's';

            //Iniate the game with 0 on counter.
            newMatch.textContent = '0';
            wrongMatch.textContent = '0';

            startTimer(30);
        }

    }

    // Add eventListener click to a level game button
    document.getElementById('start-game').addEventListener("click", startEasyGame);
    document.getElementById('hard-level').addEventListener("click", startHardGame);

    // Function to set the timer according the level game choice
    function startTimer(duration) {
        currentTime = duration;
        timeInterval = setInterval(updateTime, 1000);

    }

    function updateTime() {
        if (gameInProgress && currentTime > 0) {
            currentTime--;
            timer.textContent = (currentTime + 's');
        } else if (currentTime === 0) {
            clearInterval(timeInterval);
            gameInProgress = false;

            //Calling the function to show a message saying Game Over
            gameOverMessage();
            removeEventListener.cardElement('click');

        }
    }

    function resetTimer() {
        clearInterval(timeInterval);
        currentTime = 60;
        timer.textContent = currentTime;
    }

    function resetGame() {
        cards.forEach(card => {
            card.flipped = false;
            card.matched = false;
            card.found = false;
        });
        chosenCards.length = 0;

        createBoard(cards);
        hideWinMessage();
        hideOverMessage();
        resetTimer();
    }

    // This function flips a card and updates the game board
    function flipCard(card, cards) {
        //If the game is not in progessing, user will not be able to click on the card
        if (!gameInProgress) return;

        // Check is the card is not flipped and if we have flipped less than 2 cards
        if (chosenCards.length < 2 && !card.flipped && !card.matched) {
            card.flipped = true; // Mark the card as flipped
            chosenCards.push(card); // Add the card to flipped cards
            createBoard(cards);

            //after chosen 2 cards, wait for 1 second before checking for match
            if (chosenCards.length === 2) {
                setTimeout(checkMatchingCards, 1000, cards);
            }
        }
    }

    // This function shuffles the cards array.
    // It generates a random order of the cards for a game.
    function shuffleCards(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

    // this function create the game board.
    function createBoard(cards) {

        // Clear the existing content of the board element
        board.innerHTML = '';

        // Loop through each card in the array
        cards.forEach(card => {
            if (!card.matched || card.found) {
                const cardElement = document.createElement('div');
                const imgElement = document.createElement('img');

                // Adds a class to the image element for styling CSS
                imgElement.classList.add('card-image');

                // Adds an event listener to flip the card when clicked
                cardElement.addEventListener('click', () => {
                    flipCard(card, cards); // calling function flipCard
                });
                if (card.found) {
                    imgElement.src = 'assets/images/check.webp';
                } else if (card.flipped) { // Check if the card is flipped (face up) or not (face down)
                    imgElement.src = card.img;
                } else {
                    imgElement.src = 'assets/images/cover.webp';
                }
                // Append the image element to the card element
                // Append the card element to the game board
                cardElement.appendChild(imgElement);
                board.appendChild(cardElement);
            }
        });
    }

    // This function check matching cards
    function checkMatchingCards(cards) {

        // const flippedCards = cards.filter(card => card.flipped);
        if (chosenCards.length === 2) {
            const [card1, card2] = chosenCards;

            if (card1.name === card2.name) {
                // Cards are match
                card1.matched = true;
                card2.matched = true;
                card1.found = true;
                card2.found = true;

                // Increment 1 for every new match 
                newMatch.textContent = Number(newMatch.textContent) + 1;

            } else {
                card1.flipped = false;
                card2.flipped = false;

                // Increment 1 for every unmacth cards
                wrongMatch.textContent = Number(wrongMatch.textContent) + 1;
            }

            chosenCards.length = 0; // Clear the array of cards chosen.
            createBoard(cards); // Update the Board

            if (cards.every(card => card.matched)) {

                showWinMessage();

                gameInProgress = false; // Game finished, stop timer

            }
        }
    }

    //Function that show a message to the user when all matches has been found
    function showWinMessage() {
        // Get the element with the ID 'win-message' from the DOM
        const winMessage = document.getElementById('win-message');

        // Check if the element was found
        if (winMessage) {
            const timerInfo = `Congrats!! You found all the pairs in "${60 - currentTime} seconds!"`;
            winMessage.querySelector('p').textContent = timerInfo;
            winMessage.style.display = 'block'; // This makes the element visible
        }
    }

    //Function that hide the win message when the game starts again
    function hideWinMessage() {
        // Get the element with the ID 'win-message' from the DOM
        const winMessage = document.getElementById('win-message');

        // Check if the element was found
        if (winMessage) {
            winMessage.style.display = 'none'; // This makes the element invisible
        }
    }

    //Function that show a message to the user when the game is over
    function gameOverMessage() {
        // Get the element with the ID 'game-over-message' from the DOM
        const gameOverAlert = document.getElementById('game-over-message');

        // Check if the element was found
        if (gameOverAlert) {
            gameOverAlert.style.display = 'block'; // This makes the element visible
        }
    }

    //Function that hide the game over message when the game starts again
    function hideOverMessage() {
        // Get the element with the ID 'win-message' from the DOM
        const gameOverAlert = document.getElementById('game-over-message');

        // Check if the element was found
        if (gameOverAlert) {
            gameOverAlert.style.display = 'none'; // This makes the element invisible
        }
    }


    function checkGameOver() {

    }



});