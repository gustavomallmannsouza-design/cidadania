function verificarResposta(isCorreto) {
    const resultadoDiv = document.getElementById("resultado-quiz");
    
    if (isCorreto) {
        resultadoDiv.innerHTML = "✅ Certinho! Mandou bem. Credenciais de jogos são pessoais e nunca devem ser compartilhadas com estranhos.";
        resultadoDiv.className = "resultado correto";
    } else {
        resultadoDiv.innerHTML = "❌ Resposta incorreta! Cuidado. Esse é um golpe clássico de Phishing para roubar contas de jogos.";
        resultadoDiv.className = "resultado incorreto";
    }
}

