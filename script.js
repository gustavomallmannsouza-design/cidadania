// CONTROLE DE FLUXO DE ABAS
function switchGame(gameId) {
    document.querySelectorAll('.game-wrapper').forEach(wrapper => wrapper.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(gameId).classList.add('active');
    event.target.classList.add('active');
}

/* ==================== MÓDULO: JOGO DA VELHA ==================== */
let velhaPlayer = "X";
let velhaState = ["", "", "", "", "", "", "", "", ""];
let velhaActive = true;
const velhaConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

document.querySelectorAll('#velha-board .cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (velhaState[idx] !== "" || !velhaActive) return;

        velhaState[idx] = velhaPlayer;
        e.target.textContent = velhaPlayer;
        e.target.classList.add(velhaPlayer.toLowerCase());

        checkVelhaResult();
    });
});

function checkVelhaResult() {
    let win = false;
    for (let condition of velhaConditions) {
        if (velhaState[condition[0]] && velhaState[condition[0]] === velhaState[condition[1]] && velhaState[condition[0]] === velhaState[condition[2]]) {
            win = true; break;
        }
    }
    if (win) {
        document.getElementById('velha-status').textContent = `🎉 Jogador ${velhaPlayer} Venceu!`;
        velhaActive = false;
    } else if (!velhaState.includes("")) {
        document.getElementById('velha-status').textContent = "🤝 Empate! Deu velha.";
        velhaActive = false;
    } else {
        velhaPlayer = velhaPlayer === "X" ? "O" : "X";
        document.getElementById('velha-status').textContent = `Vez do jogador: ${velhaPlayer}`;
    }
}

function resetVelha() {
    velhaPlayer = "X"; velhaState = ["", "", "", "", "", "", "", "", ""]; velhaActive = true;
    document.getElementById('velha-status').textContent = "Vez do jogador: X";
    document.querySelectorAll('#velha-board .cell').forEach(c => { c.textContent = ""; c.className = "cell"; });
}

/* ==================== MÓDULO: JOGO DA MEMÓRIA ==================== */
const emojis = ['🎮','🎮','🎲','🎲','🧩','🧩','🎯','🎯','👾','👾','🐱','🐱','🐸','🐸','🦊','🦊'];
let memoryChosen = [];
let memoryChosenId = [];
let memoryMatches = 0;

function initMemoria() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    const shuffled = emojis.sort(() => 0.5 - Math.random());
    shuffled.forEach((emoji, i) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.setAttribute('data-id', i);
        card.textContent = emoji;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
    document.getElementById('memoria-status').textContent = "Encontre os pares de emojis!";
    memoryMatches = 0;
}

function flipCard() {
    const id = this.getAttribute('data-id');
    if (memoryChosenId.length === 2 || memoryChosenId.includes(id)) return;

    this.classList.add('flipped');
    memoryChosen.push(this.textContent);
    memoryChosenId.push(id);

    if (memoryChosen.length === 2) {
        setTimeout(checkMemoryMatch, 700);
    }
}

function checkMemoryMatch() {
    const cards = document.querySelectorAll('.memory-card');
    const [id1, id2] = memoryChosenId;
    if (memoryChosen[0] === memoryChosen[1]) {
        cards[id1].className = 'memory-card matched';
        cards[id2].className = 'memory-card matched';
        memoryMatches++;
        if (memoryMatches === emojis.length / 2) document.getElementById('memoria-status').textContent = "🎉 Parabéns! Você limpou a grade!";
    } else {
        cards[id1].classList.remove('flipped');
        cards[id2].classList.remove('flipped');
    }
    memoryChosen = []; memoryChosenId = [];
}

function resetMemoria() { initMemoria(); }

/* ==================== MÓDULO: ADIVINHAÇÃO ==================== */
let secretNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;

function checkGuess() {
    const input = document.getElementById('guess-input');
    const feedback = document.getElementById('adivinha-feedback');
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.textContent = "⚠️ Digite um número válido entre 1 e 100."; return;
    }

    guessCount++;
    if (guess === secretNumber) {
        feedback.textContent = `🎉 Acertou! O número era ${secretNumber}. Total de tentativas: ${guessCount}`;
    } else if (guess > secretNumber) {
        feedback.textContent = `📉 Errou! O número secreto é MENOR do que ${guess}. (Tentativas: ${guessCount})`;
    } else {
        feedback.textContent = `📈 Errou! O número secreto é MAIOR do que ${guess}. (Tentativas: ${guessCount})`;
    }
    input.value = '';
}

function resetAdivinha() {
    secretNumber = Math.floor(Math.random() * 100) + 1; guessCount = 0;
    document.getElementById('adivinha-feedback').textContent = "Tentativas: 0";
    document.getElementById('guess-input').value = '';
}

// Inicializações automáticas ao abrir a página
initMemoria();

