const cards = [
    { number: 2, icon: '2️⃣' },
    { number: 4, icon: '4️⃣' },
    { number: 6, icon: '6️⃣' },
    { number: 8, icon: '8️⃣' },
    { number: 10, icon: '🔟' },
    { number: 12, icon: '1️⃣2️⃣' },
    { number: 14, icon: '1️⃣4️⃣' },
    { number: 16, icon: '1️⃣6️⃣' },
    { number: 2, icon: '2️⃣' },
    { number: 4, icon: '4️⃣' },
    { number: 6, icon: '6️⃣' },
    { number: 8, icon: '8️⃣' },
    { number: 10, icon: '🔟' },
    { number: 12, icon: '1️⃣2️⃣' },
    { number: 14, icon: '1️⃣4️⃣' },
    { number: 16, icon: '1️⃣6️⃣' }
];

const gameContainer = document.querySelector('.memory-game');
const scoreElement = document.getElementById('score');
let score = 0;

cards.sort(() => 0.5 - Math.random());

cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.setAttribute('data-number', card.number);
    cardElement.innerHTML = `
        <div class="front-face"></div>
        <div class="back-face">${card.icon}</div>
    `;
    gameContainer.appendChild(cardElement);
    cardElement.addEventListener('click', flipCard);
});

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.getAttribute('data-number') === secondCard.getAttribute('data-number');

    if (isMatch) {
        disableCards();
        updateScore();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateScore() {
    score += 2;  // Incrementa a pontuação por encontrar um par
    scoreElement.textContent = `Pontuação: ${score}`;
}
