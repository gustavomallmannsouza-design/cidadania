window.addEventListener('DOMContentLoaded', () => {
    
    // Aguarda o término da animação da barra de carregamento (3 segundos)
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        
        // Adiciona a classe que faz a tela de splash desaparecer
        splash.classList.add('hidden');
        
    }, 3200); 
});

