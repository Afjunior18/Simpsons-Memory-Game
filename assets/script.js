// Wait for the page to finish loading before running any JavaScript.

document.addEventListener("DOMContentLoaded", () => {

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

    // Getting references to HTML elements for later manipulation.

    const board = document.getElementById('game-board');
    const newMatch = document.getElementById('new-match');
    const wrongMatch = document.getElementById('wrong-match');

    // buttons, start and restart

    const runGame = document.getElementById('start-game');
    const restartGame = document.getElementById('restart-game');

    runGame.addEventListener('click', startGame);

    // Array to keep track of chosen cards
    let cardsChosen = [];


    // Function to initiate the game.
    // Shuffles the cards and creates the game board.

    function startGame() {
        const shuffledCards = shuffleCards(cards);
        createBoard(shuffledCards);

    }
    // calling the function to initiate the game
    startGame();

    // This function flips a card and updates the game board

    function flipCard(card, cards) {
        // Check is the card is not flipped and if we have flipped less than 2 cards
        if (!card.flipped && cardsChosen.length < 2) {
            card.flipped = true; // Mark the card as flipped
            cardsChosen.push(card); // Add the card to flipped cards

            checkMatchingCards(cards);

            //after chosen 2 cards, wait for 2 seconds before checking for match
            if (cardsChosen.length === 2) {
                createBoard(cards); // Update the board after flipping the card
                setTimeout(checkMatchingCards, 2000, cards);
            } else {
                createBoard(cards);
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



    function checkMatchingCards(cardsChosen) {

        // const flippedCards = cards.filter(card => card.flipped);
        if (cardsChosen.length === 2) {
            const [card1, card2] = cardsChosen;

            if (card1.name === card2.name) {

                // Cards are match
                card1.matched = true;
                card2.matched = true;

            } else {
                // unflip the cards again
                card1.flipped = false;
                card2.flipped = false;
            }
            cardsChosen = []; // clear the array of cards chosen.
            createBoard(cards); // Update the Board
        }
    }

    function updateScore() {

    }

    function checkGameOver() {

    }


});