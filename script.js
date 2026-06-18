const tabuleiro = document.querySelector('.tabuleiro');
const celulas = document.querySelectorAll('.celula');
const statusTexto = document.getElementById('status');
const botaoReiniciar = document.getElementById('reset-btn');

let jogadorAtual = 'X';
let jogoAtivo = true;
let estadoDoJogo = ["", "", "", "", "", "", "", "", ""];

// Combinações possíveis para vencer
const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

function cliqueNaCelula(evento) {
    const celulaClicada = evento.target;
    const indexClicado = parseInt(celulaClicada.getAttribute('data-index'));

    // Verifica se a célula já está ocupada ou se o jogo acabou
    if (estadoDoJogo[indexClicado] !== "" || !jogoAtivo) {
        return;
    }

    // Atualiza o estado lógico e o visual
    estadoDoJogo[indexClicado] = jogadorAtual;
    celulaClicada.textContent = jogadorAtual;
    celulaClicada.classList.add(jogadorAtual);

    verificarResultado();
}

function verificarResultado() {
    let rodadaVencida = false;

    for (let i = 0; i < combinacoesVitoria.length; i++) {
        const combinacao = combinacoesVitoria[i];
        let a = estadoDoJogo[combinacao[0]];
        let b = estadoDoJogo[combinacao[1]];
        let c = estadoDoJogo[combinacao[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            rodadaVencida = true;
            break;
        }
    }

    if (rodadaVencida) {
        statusTexto.textContent = `Jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;
        return;
    }

    // Se não houver espaços vazios e ninguém venceu, deu empate (velha)
    let empate = !estadoDoJogo.includes("");
    if (empate) {
        statusTexto.textContent = "Deu velha! Empate.";
        jogoAtivo = false;
        return;
    }

    // Alterna o jogador
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    statusTexto.textContent = `Vez do jogador ${jogadorAtual}`;
}

function reiniciarJogo() {
    jogadorAtual = 'X';
    jogoAtivo = true;
    estadoDoJogo = ["", "", "", "", "", "", "", "", ""];
    statusTexto.textContent = `Vez do jogador ${jogadorAtual}`;
    
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove('X', 'O');
    });
}

// Ouvintes de eventos
celulas.forEach(celula => celula.addEventListener('click', cliqueNaCelula));
botaoReiniciar.addEventListener('click', reiniciarJogo);
