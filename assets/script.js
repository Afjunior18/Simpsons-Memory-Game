// Wait for the page to finish loading before running any JavaScript.

document.addEventListener("DOMContentLoaded", () => {

    const cards = [
        {
            name: 'Card01',
            img: 'assets/images/bart.webp',
            flipped: false
        },
        {
            name: 'Card02',
            img: 'assets/images/bart01.webp',
            flipped: false
        },
        {
            name: 'Card03',
            img: 'assets/images/family.webp',
            flipped: false
        },
        {
            name: 'Card04',
            img: 'assets/images/homer.webp',
            flipped: false
        },
        {
            name: 'Card01',
            img: 'assets/images/lisa.webp',
            flipped: false
        },
        {
            name: 'Card05',
            img: 'assets/images/mother.webp',
            flipped: false
        },
        {
            name: 'Card01',
            img: 'assets/images/bart.webp',
            flipped: false
        },
        {
            name: 'Card02',
            img: 'assets/images/bart01.webp',
            flipped: false
        },
        {
            name: 'Card03',
            img: 'assets/images/family.webp',
            flipped: false
        },
        {
            name: 'Card04',
            img: 'assets/images/homer.webp',
            flipped: false
        },
        {
            name: 'Card01',
            img: 'assets/images/lisa.webp',
            flipped: false
        },
        {
            name: 'Card05',
            img: 'assets/images/mother.webp',
            flipped: false
        },
    ];

    // Getting references to HTML elements for later manipulation.

    const board = document.getElementById('game-board');
    const newMatch = document.getElementById('new-match');
    const wrongMatch = document.getElementById('wrong-match');

    // buttons, start and restart

    const runGame = document.getElementById('start-game');
    const restartGame = document.getElementById('restart-game');

    runGame.addEventListener('click', startGame);


    // Function to initiate the game.
    // Shuffles the cards and creates the game board.

    function startGame() {
        const shuffledCards = shuffleCards(cards);
        createBoard();
    }
    // calling the function to initiate the game
    startGame();


    // This function shuffles the cards array.
    // It generates a random order of the cards for a game.

    function shuffleCards(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

    // let cardsChosen = [];
    // let cardsChosenId = [];
    // let cardsWon = [];


    // this function create the game board.

    function createBoard() {
        // Clear the existing content of the board element
        board.innerHTML = '';
        // Loop through each card in the array
        cards.forEach(card => {
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
        });
    }

    // This function flips a card and updates the game board

    function flipCard(card, cards) {
        if (!card.flipped) {
            card.flipped = true;
            createBoard(cards); // Atualiza o tabuleiro após virar a carta
        }
    }



    // All function for use on Memory game



    function checkMatchingCards() {

    }

    function updateScore() {

    }

    function checkGameOver() {

    }


});