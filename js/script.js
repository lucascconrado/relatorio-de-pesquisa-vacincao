// ========================================================== 
// SISTEMA DE RESPONSIVIDADE + FUNÇÃO DA GAVETA DA TABELA
// ========================================================== 

window.onload = function() {
        window.scrollTo(0, 0); 
    // 1. LÓGICA DO ALERTA DISCRETO E TEMPORÁRIO (Seu Pedido)
    const alerta = document.getElementById('alerta-experiencia');
    
    if (alerta) {
        // Faz o banner aparecer (garante que a "gaveta" de aviso abre)
        alerta.style.display = 'block'; 
        alerta.style.opacity = '1'; // Garante que a opacidade inicial seja 1

        // Define que sumirá após 5 segundos (5000ms)
        setTimeout(() => {
            // Inicia a transição para sumir suavemente
            alerta.style.opacity = '0';
            
            // Depois de 500ms (para a transição terminar), esconde totalmente
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 500); 

        }, 5000); 
    }
    
    // 2. INICIALIZAÇÃO DAS FUNÇÕES ESSENCIAIS (RESTAURADO)
    
    // Inicializa as funções do seu layout (tabela, cards, etc.)
    adaptarLayout();
    inicializarSistemaGaveta();
    
    // Configura o evento de redimensionamento
    window.addEventListener('resize', adaptarLayout);
};

// ========================================================== 
// 3. SISTEMA DA GAVETA (PC) - MANTIDO
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
// 4. SISTEMA RESPONSIVO (MOBILE) - CRÍTICO PARA EXIBIÇÃO
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
    
    // Limpa o container e força a recriação dos cards (CRÍTICO)
    cardsContainer.innerHTML = ''; 
    
    const linhas = tabela.querySelectorAll('tbody tr:not(.linha-detalhes)');
    
    if (linhas.length === 0) return;

    // Popula o container com os novos cards
    linhas.forEach((linha, index) => {
        const celulas = linha.querySelectorAll('td');
        if (celulas.length >= 6) {
            const card = document.createElement('div');
            card.className = 'card-unidade';
            
            const contatoElement = linha.nextElementSibling.querySelector('p');
            const linkMapaElement = linha.nextElementSibling.querySelector('a');

            const contatoTextoCru = contatoElement ? contatoElement.textContent.replace('Contato:', '').trim() : 'Não disponível';
            const contatoTelefone = contatoTextoCru.replace(/\D/g, ''); 
            const href = linkMapaElement ? linkMapaElement.getAttribute('href') : '#';
            const target = linkMapaElement ? linkMapaElement.getAttribute('target') : '_self';

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
    
    // Fechar todas as gavetas no desktop
    document.querySelectorAll('.box-detalhes').forEach(box => {
        box.classList.remove('open');
    });
    document.querySelectorAll('.linha-ativa').forEach(linha => {
        linha.classList.remove('linha-ativa');
    });
}

// ========================================================== 
// 5. FUNÇÃO PARA DETALHES MOBILE (Gera os botões laranja)
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
            // 1. Extrai o texto do Contato
            const contatoElement = linhaDetalhes.querySelector('p');
            const linkMapaElement = linhaDetalhes.querySelector('a');
            
            const contatoTextoCru = contatoElement ? contatoElement.textContent.replace('Contato:', '').trim() : 'Não disponível';
            const contatoTelefone = contatoTextoCru.replace(/\D/g, ''); 
            const href = linkMapaElement ? linkMapaElement.getAttribute('href') : '#';
            const target = linkMapaElement ? linkMapaElement.getAttribute('target') : '_self';

            // 2. Monta o HTML FINAL com os wrappers DIV para os botões laranjas.
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

// ========================================================== 
// 3. FUNÇÃO PARA DETALHES MOBILE
// ========================================================== 

function mostrarDetalhesMobile(index) {
    const detalhes = document.getElementById(`detalhes-mobile-${index}`);
    const estaVisivel = detalhes.style.display !== 'none';
    
    // Esconder todos os detalhes primeiro
    document.querySelectorAll('.detalhes-card').forEach(d => {
        d.style.display = 'none';
    });
    
    // Mostrar/ocultar os detalhes clicados
    if (!estaVisivel) {
        const tabela = document.getElementById('tabela-vacinacao');
        const linhaDetalhes = tabela.querySelectorAll('tbody tr.linha-detalhes')[index];
        
        if (linhaDetalhes) {
            const contato = linhaDetalhes.querySelector('p')?.textContent || 'Contato não disponível';
            const linkMapa = linhaDetalhes.querySelector('a')?.outerHTML || 'Mapa não disponível';
            
            detalhes.innerHTML = `
                <p><strong>${contato}</strong></p>
                <p>${linkMapa}</p>
            `;
        }
        
        detalhes.style.display = 'block';
    }
}


// ========================================================== 
// 3. FUNÇÃO PARA DETALHES MOBILE - Versão Otimizada
// ========================================================== 

function mostrarDetalhesMobile(index) {
    const detalhes = document.getElementById(`detalhes-mobile-${index}`);
    const botao = document.querySelector(`.card-unidade:nth-child(${index + 1}) .btn-detalhes`);
    const estaVisivel = detalhes.style.display !== 'none';
    
    // Esconder todos os detalhes primeiro e resetar o texto do botão
    document.querySelectorAll('.detalhes-card').forEach((d, i) => {
        d.style.display = 'none';
        document.querySelector(`.card-unidade:nth-child(${i + 1}) .btn-detalhes`).textContent = '📞 Ver Contato & Mapa';
    });
    
    // Mostrar/ocultar os detalhes clicados
    if (!estaVisivel) {
        const tabela = document.getElementById('tabela-vacinacao');
        const linhaDetalhes = tabela.querySelectorAll('tbody tr.linha-detalhes')[index];
        
        if (linhaDetalhes) {
            // 1. Extrai o texto do Contato e formata como link tel:
            const contatoTexto = linhaDetalhes.querySelector('p')?.textContent.replace('Contato:', '').trim() || 'Não disponível';
            const contatoTelefone = contatoTexto.replace(/\D/g, ''); // Remove todos os não-dígitos
            const contatoHTML = `<strong>Contato: <a href="tel:${contatoTelefone}">${contatoTexto}</a></strong>`;
            
            // 2. Extrai o link do Mapa
            const linkMapaElement = linhaDetalhes.querySelector('a');
            const linkMapaHTML = linkMapaElement ? linkMapaElement.outerHTML.replace('Localização no maps.', 'Abrir no Google Maps 🗺️') : 'Mapa não disponível';

            // 3. Monta o HTML no detalhes-card
            detalhes.innerHTML = `
                <p>${contatoHTML}</p>
                <p>${linkMapaHTML}</p>
            `;
        }
        
        detalhes.style.display = 'block';
        botao.textContent = '👆 Fechar Detalhes';
    }
}

