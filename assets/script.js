// Wait for the page to finish loading before running any JavaScript.

document.addEventListener("DOMContentLoaded", () => {

    // Getting references to HTML elements for later manipulation.

    const board = document.getElementById('game-board');
    const timer = document.querySelector('#timer-count');
    const newMatch = document.getElementById('new-match');
    const wrongMatch = document.getElementById('wrong-match');
    // button start a new game 
    const runGame = document.getElementById('start-game');

    // Create variable for start a timer 

    let currentTime = 60;
    let timeInterval;

    // Array to keep track of chosen cards

    let chosenCards = [];

    // Variable to control timer if game is in progressing 
    let gameInProgress = false;

    // Array with all cards object

    const cards = [{
        name: 'Card01',
        img: 'assets/images/bart.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card02',
        img: 'assets/images/bart01.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card03',
        img: 'assets/images/family.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card04',
        img: 'assets/images/homer.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card05',
        img: 'assets/images/lisa.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card06',
        img: 'assets/images/mother.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card01',
        img: 'assets/images/bart.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card02',
        img: 'assets/images/bart01.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card03',
        img: 'assets/images/family.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card04',
        img: 'assets/images/homer.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card05',
        img: 'assets/images/lisa.webp',
        flipped: false,
        matched: false
    },
    {
        name: 'Card06',
        img: 'assets/images/mother.webp',
        flipped: false,
        matched: false
    }
    ];

    // Function to initiate the game.
    // Shuffles the cards and creates the game board.

    function startGame() {
        if (!gameInProgress) {
            const shuffledCards = shuffleCards(cards);
            createBoard(shuffledCards);
            resetGame();
            gameInProgress = true; // Game in progressing, starting timer.

            timer.textContent = '60' + 's';

            //Iniate the game with 0 on counter.
            newMatch.textContent = '0';
            wrongMatch.textContent = '0';

            startTimer();
        }
    }

    // calling the function to initiate the game
    // startGame();

    // Add eventListener click to a start button for starting the timer
    document.getElementById('start-game').addEventListener("click", startGame);


    // Function to set timer

    function startTimer() {

        timeInterval = setInterval(updateTime, 1000);

    }

    function updateTime() {
        if (gameInProgress) {
            currentTime--;
            timer.textContent = (currentTime + 's');
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
        });
        chosenCards.length = 0;
        createBoard(cards);
        resetTimer();
    }

    // Add eventListener to a start a new game button  
    runGame.addEventListener('click', startGame);

    // This function flips a card and updates the game board

    function flipCard(card, cards) {
        // Check is the card is not flipped and if we have flipped less than 2 cards
        if (chosenCards.length < 2 && !card.flipped && !card.matched) {
            card.flipped = true; // Mark the card as flipped
            chosenCards.push(card); // Add the card to flipped cards
            createBoard(cards);

            //after chosen 2 cards, wait for 1 second before checking for match
            if (chosenCards.length === 2) {
                setTimeout(checkMatchingCards, 1000, cards);
            }

            // Marcar ponto no Match
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
            if (!card.matched) {
                const cardElement = document.createElement('div');
                const imgElement = document.createElement('img');

                // Adds a class to the image element for styling CSS
                imgElement.classList.add('card-image');

                // Adds an event listener to flip the card when clicked
                cardElement.addEventListener('click', () => {
                    flipCard(card, cards); // calling function flipCard
                });

                // Check if the card is flipped (face up) or not (face down)
                if (card.flipped) {
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


    // All function for use on Memory game

    function checkMatchingCards(cards) {

        // const flippedCards = cards.filter(card => card.flipped);
        if (chosenCards.length === 2) {
            const [card1, card2] = chosenCards;

            if (card1.name === card2.name) {
                // Cards are match
                card1.matched = true;
                card2.matched = true;

                // Increment 1 for every new match
                newMatch.textContent = Number(newMatch.textContent) + 1;

            } else {
                card1.flipped = false;
                card2.flipped = false;

                // Increment 1 for every new match
                wrongMatch.textContent = Number(wrongMatch.textContent) + 1;
            }

            chosenCards.length = 0; // Clear the array of cards chosen.
            createBoard(cards); // Update the Board

            if (cards.every(card => card.matched)) {
                alert('Congrats! You won...');
                gameInProgress = false; // Game finished, stop timer

            }
        }
    }

    function checkGameOver() {

    }

});