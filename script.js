// Aguarda todo o conteúdo da página ser carregado
window.addEventListener('DOMContentLoaded', () => {
    
    // Define um tempo de 3500 milissegundos (3.5 segundos) para a imagem sumir
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        
        // Adiciona a classe CSS que esconde a tela com efeito de fade-out
        splash.classList.add('hidden');
        
    }, 3500); 
});

