// ========================================================== 
// FUNÇÃO AUXILIAR: CENTRALIZA A EXTRAÇÃO DE CONTATO E LINK (CORRIGIDA)
// ========================================================== 
// Objetivo: Acessar P e A DIRETAMENTE do .box-detalhes sem duplicação.

function getDetalhesLinha(linhaDetalhes) {
    if (!linhaDetalhes) {
        return { contatoTextoCru: 'Não disponível', contatoTelefone: '#', href: '#', target: '_self' };
    }
    
    // 1. Localiza a div .box-detalhes DENTRO da linha <tr>
    const boxDetalhes = linhaDetalhes.querySelector('.box-detalhes');
    
    if (!boxDetalhes) {
        return { contatoTextoCru: 'Não disponível', contatoTelefone: '#', href: '#', target: '_self' };
    }

    // 2. Extrai P e A DIRETAMENTE de dentro da div .box-detalhes
    const contatoElement = boxDetalhes.querySelector('p');
    const linkMapaElement = boxDetalhes.querySelector('a');

    // 3. Processamento dos dados (permanece o mesmo)
    const contatoTextoCru = contatoElement ? contatoElement.textContent.replace('Contato:', '').trim() : 'Não disponível';
    const contatoTelefone = contatoTextoCru.replace(/\D/g, ''); 
    const href = linkMapaElement ? linkMapaElement.getAttribute('href') : '#';
    const target = linkMapaElement ? linkMapaElement.getAttribute('target') : '_self';
    
    return { contatoTextoCru, contatoTelefone, href, target };
}

// ... o resto do seu código permanece igual ...

// ========================================================== 
// FUNÇÕES DE INICIALIZAÇÃO E EVENTOS
// ========================================================== 

window.onload = function() {
    window.scrollTo(0, 0); 
    
    // 1. LÓGICA DO ALERTA DISCRETO E TEMPORÁRIO
    const alerta = document.getElementById('alerta-experiencia');
    
    if (alerta) {
        alerta.style.display = 'block'; 
        alerta.style.opacity = '1';

        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 500); 

        }, 5000); 
    }
    
    // 2. INICIALIZAÇÃO DAS FUNÇÕES ESSENCIAIS
    adaptarLayout();
    inicializarSistemaGaveta();
    
    window.addEventListener('resize', adaptarLayout);
};

// ========================================================== 
// SISTEMA DA GAVETA (PC)
// ========================================================== 

function inicializarSistemaGaveta() {
    const linhasClicaveis = document.querySelectorAll('tbody tr:not(.linha-detalhes)');

    linhasClicaveis.forEach(linha => {
        linha.addEventListener('click', () => {
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
// SISTEMA RESPONSIVO (MOBILE/DESKTOP)
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
    
    if (!cardsContainer || !tabela) return; 
    
    // --- PASSO CRÍTICO PARA IOS: ESCONDE O CONTEÚDO ORIGINAL DA TABELA ---
    document.querySelectorAll('.box-detalhes').forEach(box => {
        box.style.display = 'none';
        box.classList.remove('open'); 
    });
    // ----------------------------------------------------------------------
    
    // Limpa o container e força a recriação dos cards
    cardsContainer.innerHTML = ''; 
    
    const linhas = tabela.querySelectorAll('tbody tr:not(.linha-detalhes)');
    
    if (linhas.length === 0) return;

    // Popula o container com os novos cards
    linhas.forEach((linha, index) => {
        const celulas = linha.querySelectorAll('td');
        if (celulas.length >= 6) {
            const card = document.createElement('div');
            card.className = 'card-unidade';
            
            // NOTE: A extração do Contato/Link só é feita em 'mostrarDetalhesMobile'

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
    
    if (cardsContainer) {
        cardsContainer.innerHTML = ''; 
    }
    
    // --- PASSO CRÍTICO PARA IOS: RESTAURA A VISIBILIDADE DO BOX-DETALHES ORIGINAL ---
    document.querySelectorAll('.box-detalhes').forEach(box => {
        box.style.display = 'block'; 
    });
    // --------------------------------------------------------------------------------

    // Fechar todas as gavetas no desktop
    document.querySelectorAll('.box-detalhes').forEach(box => {
        box.classList.remove('open');
    });
    document.querySelectorAll('.linha-ativa').forEach(linha => {
        linha.classList.remove('linha-ativa');
    });
}

// ========================================================== 
// FUNÇÃO PARA DETALHES MOBILE (CORREÇÃO DE BUG FINAL NO SAFARI)
// ========================================================== 

function mostrarDetalhesMobile(index) {
    const detalhes = document.getElementById(`detalhes-mobile-${index}`);
    const botao = document.querySelector(`.card-unidade:nth-child(${index + 1}) .btn-detalhes`);
    const estaVisivel = detalhes.style.display !== 'none';
    
    // Esconder todos os detalhes primeiro e resetar o texto do botão
    document.querySelectorAll('.detalhes-card').forEach((d, i) => {
        d.style.display = 'none';
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
            // *** 1. EXTRAÇÃO BRUTA E DIRETA PARA COMBATER O BUG ***
            const boxDetalhes = linhaDetalhes.querySelector('.box-detalhes');
            
            // Pega o número de contato do elemento <p> original:
            const contatoTextoCru = boxDetalhes.querySelector('p') ? boxDetalhes.querySelector('p').textContent.replace('Contato:', '').trim() : 'Não disponível';
            const contatoTelefone = contatoTextoCru.replace(/\D/g, ''); 
            
            // Pega o link do mapa do elemento <a> original:
            const linkMapaElement = boxDetalhes.querySelector('a');
            const href = linkMapaElement ? linkMapaElement.getAttribute('href') : '#';
            const target = linkMapaElement ? linkMapaElement.getAttribute('target') : '_self';

            // 2. MONTAGEM DO HTML FINAL (A Chave é remover o <p>Contato:</p> solto)
            detalhes.innerHTML = `
                <p>Contato:</p> 
                <div class="detalhe-content-wrapper">
                    
                    <div class="btn-detalhe-wrapper contato-btn">
                        <a href="tel:${contatoTelefone}">
                            ${contatoTextoCru}
                        </a>
                    </div>
                    
                    <div class="btn-detalhe-wrapper mapa-btn">
                        <a target="${target}" href="${href}">
                            Abrir no Google Maps 🗺️
                        </a>
                    </div>
                </div>
            `;
        }
        
        detalhes.style.display = 'block';
        botao.textContent = '👆 Fechar Detalhes';
    }
}