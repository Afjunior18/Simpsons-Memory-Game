// Wait for the page to finish loading before running any JavaScript.
document.addEventListener("DOMContentLoaded", () => {

    //Getting references to HTML elements for later manipulation
    const board = document.getElementById('game-board');
    const timer = document.querySelector('#timer-count');
    const newMatch = document.getElementById('new-match');
    const wrongMatch = document.getElementById('wrong-match');
    const runGame = document.getElementById('start-game');
    const winMessage = document.getElementById('win-message');
    const gameOverAlert = document.getElementById('game-over-message');
    const hardButton = document.getElementById('hard-level');
    const footer = document.getElementById('footer');
    const btnRules = document.getElementById('btn-rules');
    const homeRulesBtnContainer = document.getElementById('homeRulesBtnContainer');

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

    /**
     * Starts an easy level game.
     * - Hides win and game over messages.
     * - Hides buttons for game start and difficulty selection.
     * - Hides the footer.
     * Shows the rules button.
     * - Shuffles the cards and creates the game board.
     * - Resets the game state.
     * - Starts the game timer.
     */
    function startEasyGame() {
        hideWinMessage();
        hideOverMessage();

        runGame.style.display = 'none';
        hardButton.style.display = 'none';
        footer.style.display = 'none';
        homeRulesBtnContainer.style.display = 'block';

        if (!gameInProgress) {
            const shuffledCards = shuffleCards(cards);
            createBoard(shuffledCards);
            resetGame();
            gameInProgress = true; // Game in progressing, starting timer.

            timer.textContent = '60' + 's';

            newMatch.textContent = '0';
            wrongMatch.textContent = '0';

            startTimer(60);
        }
    }

    /**
     * Starts a hard level game.
     * - Hides win and game over messages.
     * - Hides buttons for game start and difficulty selection.
     * - Hides the footer.
     * - Shows the rules button.
     * - Shuffles the cards and creates the game board.
     * - Resets the game state.
     * - Starts the game timer.
     */
    function startHardGame() {
        hideWinMessage();
        hideOverMessage();

        runGame.style.display = 'none';
        hardButton.style.display = 'none';
        footer.style.display = 'none';
        homeRulesBtnContainer.style.display = 'block';

        if (!gameInProgress) {
            const shuffledCards = shuffleCards(cards);
            createBoard(shuffledCards);
            resetGame();
            gameInProgress = true; // Game in progressing, starting timer.

            timer.textContent = '30' + 's';

            newMatch.textContent = '0';
            wrongMatch.textContent = '0';

            startTimer(30);
        }
    }

    // Add eventListener click, to a level game button
    document.getElementById('start-game').addEventListener("click", startEasyGame);
    document.getElementById('hard-level').addEventListener("click", startHardGame);

    // Event listeners for starting a new game when get a message after game finishs
    document.getElementById('win-message').querySelectorAll('.btn-message')[0].addEventListener("click", startEasyGame);
    document.getElementById('win-message').querySelectorAll('.btn-message')[1].addEventListener("click", startHardGame);
    document.getElementById('game-over-message').querySelectorAll('.btn-message')[0].addEventListener("click", startEasyGame);
    document.getElementById('game-over-message').querySelectorAll('.btn-message')[1].addEventListener("click", startHardGame);


    // Adding an event listener to the "Home/Rules" button for page refresh
    btnRules.addEventListener('click', function () {
        window.location.reload();
    });

    /**
     * Starts the game timer with the specified duration.
     * Updates the timer every second.
     */
    function startTimer(duration) {
        currentTime = duration;
        timeInterval = setInterval(updateTime, 1000);
    }

    /**
     * Updates the game timer every second.
     * If the game is in progress and there is remaining time, it decrements the current time
     * and updates the timer display.
     * If the time reaches zero, it stops the timer, sets the game to not in progress,
     * and triggers the game over message.
     */
    function updateTime() {
        if (gameInProgress && currentTime > 0) {
            currentTime--;
            timer.textContent = (currentTime + 's');
        } else if (currentTime === 0) {
            clearInterval(timeInterval);
            gameInProgress = false;

            gameOverMessage();
        }
    }

    /**
     * Resets the game timer.
     * Clears the time interval and sets the current time back to the starting value.
     * Updates the timer display with the new time.
     */
    function resetTimer() {
        clearInterval(timeInterval);
        currentTime = 60;
        timer.textContent = currentTime;
    }

    /**
     * Resets the game state to start a new game.
     * - Flips all cards back to face down.
     * - Resets matching status and found status for each card.
     * - Clears the chosenCards array.
     * - Recreates the game board.
     * - Hides win and game over messages.
     * - Resets the game timer.
     */
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

    /**
     * Flips a card and updates the game board.
     * - Checks if the game is in progress before allowing card flip.
     * - Checks if the card is not already flipped and if less than 2 cards have been flipped.
     * - Marks the card as flipped.
     * - Adds the card to the chosenCards array.
     * - Updates the game board.
     * - Waits for 1 second before checking for a match if two cards have been chosen.
     */
    function flipCard(card, cards) {
        if (!gameInProgress) return;

        if (chosenCards.length < 2 && !card.flipped && !card.matched) {
            card.flipped = true;
            chosenCards.push(card);
            createBoard(cards);

            if (chosenCards.length === 2) {
                setTimeout(checkMatchingCards, 1000, cards);
            }
        }
    }

    /**
     * This function shuffles the cards array.
     * It generates a random order of the cards for a game.
     */
    function shuffleCards(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

    /**
     * Creates the game board.
     * - Clears the existing content of the board element.
     * - Loops through each card in the array.
     * - Creates a card element and an image element.
     * - Adds a class to the image element for styling CSS.
     * - Adds an event listener to flip the card when clicked.
     * - Sets the image source based on the card state (found, flipped, or face down).
     * - Appends the image element to the card element.
     * - Appends the card element to the game board.
     */
    function createBoard(cards) {
        board.innerHTML = '';

        cards.forEach(card => {
            if (!card.matched || card.found) {
                const cardElement = document.createElement('div');
                const imgElement = document.createElement('img');

                imgElement.classList.add('card-image');

                cardElement.addEventListener('click', () => {
                    flipCard(card, cards);
                });
                if (card.found) {
                    imgElement.src = 'assets/images/blue-check.png';
                } else if (card.flipped) {
                    imgElement.src = card.img;
                } else {
                    imgElement.src = 'assets/images/cover.webp';
                }

                cardElement.appendChild(imgElement);
                board.appendChild(cardElement);
            }
        });
    }

    /**
     * Checks if the chosen cards form a match.
     * - Compares the names of the two chosen cards.
     * - If they match, sets them as matched and found.
     * - Updates the score
     * - If all cards are matched, displays win message and stops the game timer.
     */
    function checkMatchingCards(cards) {
        if (chosenCards.length === 2) {
            const [card1, card2] = chosenCards;

            if (card1.name === card2.name) {

                card1.matched = true;
                card2.matched = true;
                card1.found = true;
                card2.found = true;

                newMatch.textContent = Number(newMatch.textContent) + 1;

            } else {
                card1.flipped = false;
                card2.flipped = false;

                wrongMatch.textContent = Number(wrongMatch.textContent) + 1;
            }

            chosenCards.length = 0;
            createBoard(cards);

            if (cards.every(card => card.matched)) {
                showWinMessage();

                gameInProgress = false;
            }
        }
    }

    /**
     * Displays a congratulation message when all matches are found.
     * - Constructs a message with the time taken to complete the game.
     * - Updates the message in the winMessage element.
     * - Makes the winMessage element visible.
     */
    function showWinMessage() {
        if (winMessage) {
            const timerInfo = `Congrats!! You found all the pairs in "${60 - currentTime} seconds!" Play again?`;
            winMessage.querySelector('h2').textContent = timerInfo;
            winMessage.style.display = 'block';
        }
    }

    /**
     * Hides the win message when the game starts again.
     * - Checks if the winMessage element was found.
     * - Makes the winMessage element invisible.
     */
    function hideWinMessage() {
        if (winMessage) {
            winMessage.style.display = 'none';
        }
    }

    /**
     * Shows a message to the user when the game is over.
     * - Checks if the gameOverAlert element was found.
     * - Makes the gameOverAlert element visible.
     */
    function gameOverMessage() {
        if (gameOverAlert) {
            gameOverAlert.style.display = 'block';
        }
    }

    /**
     * Hides the game over message when the game starts again.
     * - Checks if the gameOverAlert element was found.
     * - Makes the gameOverAlert element invisible.
     */
    function hideOverMessage() {
        if (gameOverAlert) {
            gameOverAlert.style.display = 'none';
        }
    }
});