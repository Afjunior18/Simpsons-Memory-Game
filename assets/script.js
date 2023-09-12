// Wait for the page to finish loading before running any JavaScript.

document.addEventListener("DOMContentLoaded", () => {

    const cards = [
        {
            name: 'Card01',
            img: 'assets/images/bart.webp',
        },
        {
            name: 'Card02',
            img: 'assets/images/bart01.webp',
        },
        {
            name: 'Card03',
            img: 'assets/images/family.webp',
        },
        {
            name: 'Card04',
            img: 'assets/images/homer.webp',
        },
        {
            name: 'Card01',
            img: 'assets/images/lisa.webp',
        },
        {
            name: 'Card05',
            img: 'assets/images/mother.webp',
        },
        {
            name: 'Card01',
            img: 'assets/images/bart.webp',
        },
        {
            name: 'Card02',
            img: 'assets/images/bart01.webp',
        },
        {
            name: 'Card03',
            img: 'assets/images/family.webp',
        },
        {
            name: 'Card04',
            img: 'assets/images/homer.webp',
        },
        {
            name: 'Card01',
            img: 'assets/images/lisa.webp',
        },
        {
            name: 'Card05',
            img: 'assets/images/mother.webp',
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

    // quando clicar ira iniciar o jogo, as cartao serao embaralhadas

    function startGame() {
        const shuffledCards = shuffleCards(cards);
        createBoard();
    }

    startGame();


    // This function shuffles an array of cards.
    // It generates a random order of the cards for a game.

    function shuffleCards(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

    // this function create the game board.

    function createBoard() {
        board.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            const imgElement = document.createElement('img');
            imgElement.src = card.img;
            cardElement.appendChild(imgElement);
            board.appendChild(cardElement);
        });
    }
    createBoard();


    // All function for use on Memory game


    function flipCards() {

    }

    function checkMatchingCards() {

    }

    function updateScore() {

    }

    function checkGameOver() {

    }


});