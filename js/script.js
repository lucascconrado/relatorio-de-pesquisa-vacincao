// ========================================================== 
// SISTEMA DE RESPONSIVIDADE + FUNÇÃO DA GAVETA DA TABELA
// ========================================================== 

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ambos os sistemas
    inicializarSistemaGaveta();
    adaptarLayout();
    
    // Observar redimensionamento da tela
    window.addEventListener('resize', adaptarLayout);
});

// ========================================================== 
// 1. SISTEMA DA GAVETA (PC) - MANTIDO DO SEU CÓDIGO
// ========================================================== 

function inicializarSistemaGaveta() {
    const linhasClicaveis = document.querySelectorAll('tbody tr:not(.linha-detalhes)');

    linhasClicaveis.forEach(linha => {
        linha.addEventListener('click', () => {
            // Só funciona no desktop (largura > 768px)
            if (window.innerWidth > 768) {
                const boxDetalhes = linha.nextElementSibling.querySelector('.box-detalhes');
                
                // Fechar todas as outras gavetas
                document.querySelectorAll('.box-detalhes').forEach(box => {
                    if (box !== boxDetalhes) {
                        box.classList.remove('open');
                        box.parentElement.parentElement.previousElementSibling?.classList.remove('linha-ativa');
                    }
                });
                
                // Abrir/fechar esta gaveta
                boxDetalhes.classList.toggle('open');
                linha.classList.toggle('linha-ativa');
            }
        });
    });
}

// ========================================================== 
// 2. SISTEMA RESPONSIVO (MOBILE) - NOVO
// ========================================================== 

function adaptarLayout() {
    const largura = window.innerWidth;
    
    if (largura <= 768) {
        adaptarParaMobile();
    } else {
        adaptarParaDesktop();
    }
}

function adaptarParaMobile() {
    const tabela = document.getElementById('tabela-vacinacao');
    const cardsContainer = document.getElementById('cards-mobile');
    
    // Se já temos cards, não fazer nada
    if (cardsContainer.children.length > 0) return;
    
    cardsContainer.innerHTML = '';
    
    const linhas = tabela.querySelectorAll('tbody tr:not(.linha-detalhes)');
    
    linhas.forEach((linha, index) => {
        const celulas = linha.querySelectorAll('td');
        if (celulas.length >= 6) {
            const card = document.createElement('div');
            card.className = 'card-unidade';
            
            card.innerHTML = `
                <h3>${celulas[0].textContent}</h3>
                <p><strong>📍 Endereço:</strong> ${celulas[1].textContent}</p>
                <p><strong>📅 Dias:</strong> ${celulas[2].textContent}</p>
                <p><strong>⏰ Horário:</strong> ${celulas[3].textContent}</p>
                <p><strong>💉 Dengue:</strong> ${celulas[4].textContent}</p>
                <p><strong>🦠 Influenza:</strong> ${celulas[5].textContent}</p>
                <button class="btn-detalhes" onclick="mostrarDetalhesMobile(${index})">📞 Ver Contato & Mapa</button>
                <div id="detalhes-mobile-${index}" class="detalhes-card" style="display: none;"></div>
            `;
            
            cardsContainer.appendChild(card);
        }
    });
}

function adaptarParaDesktop() {
    const cardsContainer = document.getElementById('cards-mobile');
    const tabela = document.getElementById('tabela-vacinacao');
    
    // Limpar cards e mostrar tabela
    cardsContainer.innerHTML = '';
    tabela.style.display = 'table';
    
    // Fechar todas as gavetas no desktop
    document.querySelectorAll('.box-detalhes').forEach(box => {
        box.classList.remove('open');
    });
    document.querySelectorAll('.linha-ativa').forEach(linha => {
        linha.classList.remove('linha-ativa');
    });
}

// REMOVIDA A FUNÇÃO ANTIGA E COMENTADA

// ========================================================== 
// 3. FUNÇÃO PARA DETALHES MOBILE - Versão CORRIGIDA FINAL (Resolve duplicação no Safari)
// ========================================================== 

function mostrarDetalhesMobile(index) {
    const detalhes = document.getElementById(`detalhes-mobile-${index}`);
    const botao = document.querySelector(`.card-unidade:nth-child(${index + 1}) .btn-detalhes`);
    const estaVisivel = detalhes.style.display !== 'none';
    
    // Esconder todos os detalhes primeiro e resetar o texto do botão
    document.querySelectorAll('.detalhes-card').forEach((d, i) => {
        d.style.display = 'none';
        // Seleciona o botão correspondente para resetar o texto
        const currentButton = document.querySelector(`.card-unidade:nth-child(${i + 1}) .btn-detalhes`);
        if (currentButton) {
            currentButton.textContent = '📞 Ver Contato & Mapa';
        }
    });
    
    // Mostrar/ocultar os detalhes clicados
    if (!estaVisivel) {
        const tabela = document.getElementById('tabela-vacinacao');
        const linhaDetalhes = tabela.querySelectorAll('tbody tr.linha-detalhes')[index];
        
        if (linhaDetalhes) {
            // 1. Extrai o texto do Contato e formata como link tel:
            const contatoElement = linhaDetalhes.querySelector('p');
            const contatoTextoCru = contatoElement ? contatoElement.textContent.replace('Contato:', '').trim() : 'Não disponível';
            const contatoTelefone = contatoTextoCru.replace(/\D/g, ''); // Remove todos os não-dígitos
            
            const contatoHTML = `
                <p style="margin-bottom: 10px;">
                    <strong style="color: var(--text-color);">
                        Contato: 
                        <a href="tel:${contatoTelefone}" style="text-decoration: none; color: var(--primary-color); font-weight: bold;">
                            ${contatoTextoCru}
                        </a>
                    </strong>
                </p>
            `;
            
            // 2. Extrai o link do Mapa.
            const linkMapaElement = linhaDetalhes.querySelector('a');
            let linkMapaHTML = 'Mapa não disponível';

            if (linkMapaElement) {
                // Cria a tag <a> completamente nova e estilizada como botão,
                // sem depender do outerHTML que pode conter o texto original.
                const href = linkMapaElement.getAttribute('href');
                const target = linkMapaElement.getAttribute('target');
                
                linkMapaHTML = `
                    <a target="${target}" href="${href}">
                        Abrir no Google Maps 🗺️
                    </a>
                `;
            }

            // 3. Monta o HTML FINAL, garantindo que o link do mapa NÃO esteja aninhado em um <p>.
            detalhes.innerHTML = `
                ${contatoHTML}
                ${linkMapaHTML}
            `;
        }
        
        detalhes.style.display = 'block';
        botao.textContent = '👆 Fechar Detalhes';
    }
}