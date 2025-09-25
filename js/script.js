// ========================================================== //
// PARTE 1: EFEITO DE TROCA DE IMAGEM DA DOUTORA             //
// ========================================================== //

// const enfermeira = document.getElementById('enfermeira');

// doutora1.addEventListener('mouseenter', () => {
//     // CORREÇÃO: .src em vez de .scr
//     doutora1.src = 'img/doutora2.webp'; 
// });

// doutora1.addEventListener('mouseleave', () => {
//     doutora1.src = 'img/doutora1.webp';
// });


// ========================================================== //
// PARTE 2: FUNCIONALIDADE DA "GAVETA" DA TABELA            //
// ========================================================== //

const linhasClicaveis = document.querySelectorAll('tbody tr:not(.linha-detalhes)');

linhasClicaveis.forEach(linha => {
    // O ouvinte de clique para cada linha
    linha.addEventListener('click', () => {
        
        // ================================================================
        // O CÓDIGO DA AÇÃO FOI MOVIDO PARA DENTRO DESTE BLOCO
        // ================================================================

        // CORREÇÃO: 'nextElementSibling' e 'querySelector'
        const boxDetalhes = linha.nextElementSibling.querySelector('.box-detalhes');

        // Adiciona/remove a classe .open para animar a gaveta
        boxDetalhes.classList.toggle('open');

        // Adiciona/remove a classe .linha-ativa para destacar o puxador
        linha.classList.toggle('linha-ativa');
    });
});

