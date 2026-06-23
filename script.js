// CONTROLADOR DE EXIBIÇÃO DE TELAS
function switchGame(gameId) {
    document.querySelectorAll('.game-wrapper').forEach(w => w.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(gameId).classList.add('active');
    event.target.classList.add('active');
}

/* ==================== ABRE JOGO 1: VELHA VS INTELIGÊNCIA ARTIFICIAL ==================== */
let iaPlayer = "X"; 
let iaState = ["", "", "", "", "", "", "", "", ""];
let iaActive = true;
const iaWinConditions = [, [3, 4, 5], [6, 7, 8],
, [1, 4, 7], [2, 5, 8],
, [2, 4, 6]
];

document.querySelectorAll('#ia-board .cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (iaState[idx] !== "" || !iaActive || iaPlayer !== "X") return;

        executeMove(e.target, idx, "X");
        if (checkVelhaWin("X")) {
            document.getElementById('ia-status').textContent = "🎉 Você venceu a Inteligência Artificial!";
            iaActive = false;
            return;
        }
        if (!iaState.includes("")) {
            document.getElementById('ia-status').textContent = "🤝 Empate perfeito!";
            iaActive = false;
            return;
        }

        // Turno da IA
        iaPlayer = "O";
        document.getElementById('ia-status').textContent = "🤖 Bot pensando...";
        setTimeout(botLogicalMove, 600);
    });
});

function executeMove(cellElement, index, player) {
    iaState[index] = player;
    cellElement.textContent = player;
    cellElement.classList.add(player.toLowerCase());
}

function botLogicalMove() {
    if (!iaActive) return;
    
    // Procura posições vazias no array de estados
    let emptyIndices = [];
    iaState.forEach((val, i) => { if (val === "") emptyIndices.push(i); });

    // Escolha de jogada simples (prioriza o centro se livre, senão aleatório)
    let chosenIndex;
    if (emptyIndices.includes(4)) {
        chosenIndex = 4;
    } else {
        chosenIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    const targetCell = document.querySelector(`#ia-board .cell[data-index='${chosenIndex}']`);
    executeMove(targetCell, chosenIndex, "O");

    if (checkVelhaWin("O")) {
        document.getElementById('ia-status').textContent = "🤖 O Bot venceu! Tente de novo.";
        iaActive = false;
        return;
    }
    if (!iaState.includes("")) {
        document.getElementById('ia-status').textContent = "🤝 Empate perfeito!";
        iaActive = false;
        return;
    }

    iaPlayer = "X";
    document.getElementById('ia-status').textContent = "Sua vez! Você é o X";
}

function checkVelhaWin(player) {
    return iaWinConditions.some(condition => {
        return condition.every(index => iaState[index] === player);
    });
}

function resetVelhaIA() {
    iaPlayer = "X"; iaState = ["", "", "", "", "", "", "", "", ""]; iaActive = true;
    document.getElementById('ia-status').textContent = "Sua vez! Você é o X";
    document.querySelectorAll('#ia-board .cell').forEach(c => { c.textContent = ""; c.className = "cell"; });
}


/* ==================== ABRE JOGO 2: JOGO DA MEMÓRIA COMPLETO ==================== */
const itemEmojis = ['🎮','🎮','🎲','🎲','🧩','🧩','🎯','🎯','👾','👾','🦊','🦊','🐱','🐱','🐸','🐸'];
let selectedCards = [];
let selectedIds = [];
let completedMatches = 0;
let blockSelection = false;

function buildMemoryBoard() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    // Algoritmo Fisher-Yates para embaralhamento perfeito
    const randomized = [...itemEmojis];
    for (let i = randomized.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
    }

    randomized.forEach((emoji, idx) => {
        const cardNode = document.createElement('div');
        cardNode.classList.add('memory-card');
        cardNode.setAttribute('data-id', idx);
        cardNode.textContent = emoji;
        cardNode.addEventListener('click', triggerCardFlip);
        grid.appendChild(cardNode);
    });
    document.getElementById('memoria-status').textContent = "Clique nas cartas para achar os pares!";
    completedMatches = 0;
}

function triggerCardFlip() {
    const cardId = this.getAttribute('data-id');
    if (blockSelection || selectedIds.includes(cardId)) return;

    this.classList.add('flipped');
    selectedCards.push(this.textContent);
    selectedIds.push(cardId);

    if (selectedCards.length === 2) {
        blockSelection = true;
        setTimeout(evaluateMemoryPair, 650);
    }
}

function evaluateMemoryPair() {
    const allCards = document.querySelectorAll('.memory-card');
    const [firstId, secondId] = selectedIds;

    if (selectedCards[0] === selectedCards[1]) {
        allCards[firstId].className = 'memory-card matched';
        allCards[secondId].className = 'memory-card matched';
        completedMatches++;
        if (completedMatches === itemEmojis.length / 2) {
            document.getElementById('memoria-status').textContent = "🎉 Vitória! Você encontrou todos os pares!";
        }
    } else {
        allCards[firstId].classList.remove('flipped');
        allCards[secondId].classList.remove('flipped');
    }
    selectedCards = []; selectedIds = []; blockSelection = false;
}

function resetMemoria() { buildMemoryBoard(); }


/* ==================== ABRE JOGO 3: ADIVINHAÇÃO DINÂMICA ==================== */
let generatedTargetNumber = Math.floor(Math.random() * 100) + 1;
let totalUserAttempts = 0;

function checkGuess() {
    const inputField = document.getElementById('guess-input');
    const displayFeedback = document.getElementById('adivinha-feedback');
    const userValue = parseInt(inputField.value);

    if (isNaN(userValue) || userValue < 1 || userValue > 100) {
        displayFeedback.textContent = "⚠️ Insira um número de 1 a 100."; 
        return;
    }

    totalUserAttempts++;
    if (userValue === generatedTargetNumber) {
        displayFeedback.textContent = `🎉 Acertou! O número era ${generatedTargetNumber}. Resolvido em ${totalUserAttempts} tentativas!`;
    } else if (userValue > generatedTargetNumber) {
        displayFeedback.textContent = `📉 Errou! O número secreto é MENOR que ${userValue}. (Chutes: ${totalUserAttempts})`;
    } else {
        displayFeedback.textContent = `📈 Errou! O número secreto é MAIOR que ${userValue}. (Chutes: ${totalUserAttempts})`;
    }
    inputField.value = '';
}

function resetAdivinha() {
    generatedTargetNumber = Math.floor(Math.random() * 100) + 1; 
    totalUserAttempts = 0;
    document.getElementById('adivinha-feedback').textContent = "Aguardando palpite...";
    document.getElementById('guess-input').value = '';
}

// Roda a montagem do jogo da memória na primeira inicialização
buildMemoryBoard();

