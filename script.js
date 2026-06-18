document.addEventListener("DOMContentLoaded", function() {
    
    // --- FUNCIONALIDADE 1: Alternador de Modo Escuro ---
    const btnTheme = document.getElementById("btn-theme");
    
    btnTheme.addEventListener("click", function() {
        const currentTheme = document.body.getAttribute("data-theme");
        
        if (currentTheme === "dark") {
            document.body.removeAttribute("data-theme");
            btnTheme.textContent = "Alternar Modo Escuro";
        } else {
            document.body.setAttribute("data-theme", "dark");
            btnTheme.textContent = "Alternar Modo Claro";
        }
    });

    // --- FUNCIONALIDADE 2: Validador do Quiz ---
    const formQuiz = document.getElementById("form-quiz");
    const divResultado = document.getElementById("resultado-quiz");

    formQuiz.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede a página de recarregar

        // Coleta as respostas selecionadas pelo usuário
        const q1 = formQuiz.elements["q1"].value;
        const q2 = formQuiz.elements["q2"].value;

        let acertos = 0;

        if (q1 === "correto") acertos++;
        if (q2 === "correto") acertos++;

        // Mostra o resultado na tela dinamicamente
        divResultado.style.display = "block";
        if (acertos === 2) {
            divResultado.style.backgroundColor = "#d4edda";
            divResultado.style.color = "#155724";
            divResultado.style.borderColor = "#c3e6cb";
            divResultado.innerHTML = `🏆 Excelente! Você acertou ${acertos} de 2 perguntas. Você tem ótimos hábitos de Cidadania Digital!`;
        } else {
            divResultado.style.backgroundColor = "#fff3cd";
            divResultado.style.color = "#856404";
            divResultado.style.borderColor = "#ffeeba";
            divResultado.innerHTML = `⚠️ Você acertou ${acertos} de 2 perguntas. Revise as dicas acima para navegar com mais segurança!`;
        }
    });
});
