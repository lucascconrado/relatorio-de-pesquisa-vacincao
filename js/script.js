const doutora1 = document.getElementById('doutora1');

doutora1.addEventListener('mouseenter', () => {
    doutora1.src = 'img/doutora2.webp';
});
doutora1.addEventListener('mouseleave', () => {
    doutora1.src = 'img/doutora1.webp';
});


// Pega todas as linhas de DADOS (ignorando as de detalhes) do corpo da tabela
const linhasClicaveis = document.querySelectorAll('tbody tr:not(.linha-detalhes)');

// Percorre cada uma das linhas que encontramos
linhasClicaveis.forEach(linha => {

    // Adiciona um "ouvinte" de clique a cada uma delas
    linha.addEventListener('click', () => {

        // Quando uma linha é clicada, encontramos a próxima linha irmã dela no HTML.
        // Pela nossa estrutura, será sempre a linha de detalhes correspondente.
        const linhaDetalhes = linha.nextElementSibling;

        // Verifica se a linha de detalhes está visível (display 'table-row')
        if (linhaDetalhes.style.display === 'table-row') {
            // Se estiver visível, esconde-a
            linhaDetalhes.style.display = 'none';
        } else {
            // Se estiver escondida, mostra-a
            linhaDetalhes.style.display = 'table-row';
        }
    });
});


