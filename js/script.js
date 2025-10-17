// ========================================================== 
// 1. DADOS DE VACINAÇÃO (Array Central)
// ========================================================== 
const POSTOS_DE_VACINACAO = [
    { 
        unidade: "Centro de Saúde Vasco Barcelos", 
        endereco: "Rua Bernardino de Mello, 1825 - Centro",
        dias: "Seg. a Sex. e Sáb. e Dom.",
        horario: "Seg. a Sex.: 8h30 às 17h | Sáb. e Dom.: 8h30 às 16h",
        dengue: "10 a 14 anos",
        influenza: "A partir de 6 meses",
        contato: "(21) 2698-2440",
        link_maps: "https://www.google.com/maps/place/Centro+de+Sa%C3%BAde+Vasco+Barcelos/@-22.7614942,-43.4498879,15z/data=!4m16!1m9!3m8!1s0x996701416b7a57:0xbd28f6f47ec27266!2sR.+Cel.+Bernardino+de+Melo,+1825+-+Centro,+Nova+Igua%C3%A7u+-+RJ,+26255-140!3b1!8m2!3d-22.7614297!4d-43.4490365!10e5!16s%2Fg%2F11pw2d1b6v!3m5!1s0x99670152c49fa7:0x1dfe2eda83b10d70!8m2!3d-22.7614942!4d-43.4498879!16s%2Fg%2F1tgnbt_5?entry=ttu&g_ep=EgoyMDI1MDkyMS4wIKXMDSoASAFQAw%3D%3D" 
    },
    { 
        unidade: "Policlínica do Shopping Nova Iguaçu (2º andar)", 
        endereco: "Av. Abílio Augusto Távora, 1111- Luz",
        dias: "Todos os dias",
        horario: "8h às 20h",
        dengue: "10 a 14 anos",
        influenza: "A partir de 6 meses",
        contato: "(21) 97102-1410",
        link_maps: "https://www.google.com/maps/place/Av.+Ab%C3%ADlio+Augusto+T%C3%A1vora,+1111+-+Luz,+Nova+Igua%C3%A7u+-+RJ,+26255-620/@-22.763303,-43.4678129,17z/data=!3m1!4b1!4m6!3m5!1s0x99676d3b7ed0f9:0xfb68da3ec28b0cb3!8m2!3d-22.763308!4d-43.4652326!16s%2Fg%2F11cs5snlzq?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D" 
    },
    {
        unidade: "Clínica da Família Vila Operária",
        endereco: "Rua Nair Dias, 880- Vila Operária",
        dias: "Seg. a Sex.",
        horario:"8h30 às 22h",
        dengue:"10 a 14anos",
        influenza:"A partir de 6 meses",
        contato:"(21) 2658-6929",
        link_maps:"https://www.google.com.br/maps/place/Rua+Nair+Dias,+880+-+Vila+Oper%C3%A1ria,+Nova+Igua%C3%A7u+-+RJ,+26012-451/@-22.7360086,-43.4357719,18z/data=!4m6!3m5!1s0x99663a7deacc07:0x95b44e3e54a07f97!8m2!3d-22.7361487!4d-43.4352406!16s%2Fg%2F11lwchbkln?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        unidade: "Clínica da Família Odiceia Morais",
        endereco: "Rua Bolívia, s/nº Centro",
        dias: "Seg. a Sex",
        horario: "8h30 às 17h",
        dengue: "10 a 14 anos",
        influenza: "A partir de 6 meses",
        contato: "(21) 2668-8088",
        link_maps: "https://www.google.com/maps/place/Cl%C3%ADnica+da+Fam%C3%ADlia+Odic%C3%A9ia+Morais/@-22.7504177,-43.4458015,17z/data=!4m6!3m5!1s0x996652bb1bc911:0x52e9799755d627e0!8m2!3d-22.7509421!4d-43.4449861!16s%2Fg%2F11bw519lwl?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        unidade:"Clínica da Família Jardim da Viga",
        endereco:"Estrada do Iguaçu, 171- Da Viga",
        dias: "Seg. a Sex.",
        horario: "8h30 às 17h",
        dengue: "10 a 14 anos",
        influenza: "A partir de 6 meses",
        contato: "(21) 2668-4615",
        link_maps: "https://www.google.com/maps/place/Cl%C3%ADnica+da+Fam%C3%ADlia+Jardim+Viga/@-22.7447911,-43.4388384,15z/data=!4m6!3m5!1s0x156196934274a13:0x1344ae47a88395da!8m2!3d-22.7446825!4d-43.438941!16s%2Fg%2F11b7gmyzz0?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        unidade:"USF Padre Manuel Monteiro (Caonze)",
        endereco:"Rua Benjamim Chambarelli, 239 - Caonze",
        dias:"Seg. a Sex.",
        horario:"8h30 às 17h",
        dengue:"10 a 14 anos",
        influenza:"A partir de 6 meses",
        contato:"(21) 2668-7358",
        link_maps:"https://www.google.com/maps/place/Posto+De+Saude+Padre+Manoel+Monteiro+K11/@-22.7675773,-43.4401551,19.71z/data=!4m15!1m8!3m7!1s0x9966fb838a1a99:0x9d908c92654053b1!2sR.+Benjamim+Chambarelli,+239+-+Caonze,+Nova+Igua%C3%A7u+-+RJ,+26250-210!3b1!8m2!3d-22.7675037!4d-43.439953!16s%2Fg%2F11c4kh63gh!3m5!1s0x9967de1c5425cf:0x991ed1fe95b31bb!8m2!3d-22.7675993!4d-43.4399677!16s%2Fg%2F11jb4lj1z1?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        unidade: "UBS da Cerâmica",
        endereco:"Estrada de Santana, 155 - Cerâmica",
        dias:"Seg. a Sex.",
        horario:"8h30 às 17h",
        dengue:"10 a 14 anos",
        influenza:"A partir de 6 meses",
        contato:"(21) 3776-9997",
        link_maps:"https://www.google.com/maps/place/Unidade+B%C3%A1sica+de+Sa%C3%BAde+Cer%C3%A2mica/@-22.7347702,-43.4878613,18.83z/data=!4m15!1m8!3m7!1s0x995d634c70e4d9:0x2ed86b757b0322ce!2sEstr.+de+Santana,+155+-+Cer%C3%A2mica,+Nova+Igua%C3%A7u+-+RJ,+26082-035!3b1!8m2!3d-22.7348722!4d-43.4876649!16s%2Fg%2F11j8sk3wdr!3m5!1s0x995d72481a05af:0x65c6ee56d9232a3a!8m2!3d-22.734883!4d-43.48771!16s%2Fg%2F1tcyyn88?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        unidade: "USF Engenho Pequeno",
        endereco: "Rua Olga Veloso, 36- Vila Operária",
        dias: "Seg. a Sex.",
        horario:"8h30 às 17h",
        dengue:"10 a 14 anos",
        influenza: "A partir de 6 meses",
        contato: "(21) 3778-4472",
        link_maps:"https://www.google.com/maps/place/USF%2FPosto+de+Sa%C3%BAde+-+Engenho+Pequeno/@-22.7430386,-43.4497729,15z/data=!4m6!3m5!1s0x996638c19fa40b:0x5fcc5d38fa6fbeb9!8m2!3d-22.7430386!4d-43.4317485!16s%2Fg%2F11b7w9j7xz?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
    },
];


// ==========================================================
// 2. FUNÇÃO: GERA E INJETA TODOS OS CARDS (Substitui toda a lógica de adaptação)
// ==========================================================
function construirCardsVacinacao() {
    const container = document.getElementById('cards-container-js');
    if (!container) return; 

    container.innerHTML = ''; // Limpa o container antes de preencher

    POSTOS_DE_VACINACAO.forEach((posto, index) => {
        const cardHTML = `
            <div class="card-unidade" onclick="toggleDetalhes(${index})">
                <h3>${posto.unidade}</h3>
                <p><strong>📍 Endereço:</strong> ${posto.endereco}</p>
                <p><strong>📅 Dias:</strong> ${posto.dias}</p>
                <p><strong>⏰ Horário:</strong> ${posto.horario}</p>
                <p class="vacina-info"><strong>💉 Dengue:</strong> ${posto.dengue}</p>
                <p class="vacina-info"><strong>🦠 Influenza:</strong> ${posto.influenza}</p>

                <button class="btn-detalhes-toggle">Ver Contato & Mapa</button>

                <div id="detalhes-posto-${index}" class="detalhes-card-final" style="display: none;">
                    <p>Contato:</p>
                    <div class="detalhe-content-wrapper">
                        <div class="btn-detalhe-wrapper contato-btn">
                            <a href="tel:${posto.contato.replace(/\D/g, '')}">
                                ${posto.contato}
                            </a>
                        </div>
                        <div class="btn-detalhe-wrapper mapa-btn">
                            <a target="_blank" href="${posto.link_maps}">
                                Abrir no Google Maps 🗺️
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}


// ==========================================================
// 3. FUNÇÃO: ABRE/FECHA DETALHES DO CARD (Nova Gaveta)
// ==========================================================
function toggleDetalhes(index) {
    const detalhes = document.getElementById(`detalhes-posto-${index}`);
    const card = document.querySelector(`#cards-container-js .card-unidade:nth-child(${index + 1})`);
    
    if (!detalhes || !card) return;

    const estaVisivel = detalhes.style.display !== 'none';
    
    // 1. Fecha todas as outras gavetas
    document.querySelectorAll('.detalhes-card-final').forEach(d => {
        if (d.id !== `detalhes-posto-${index}`) {
            d.style.display = 'none';
            d.parentElement.classList.remove('open');
            d.parentElement.querySelector('.btn-detalhes-toggle').textContent = 'Ver Contato & Mapa';
        }
    });

    // 2. Abre/Fecha a gaveta clicada
    const toggleButton = card.querySelector('.btn-detalhes-toggle');

    if (estaVisivel) {
        detalhes.style.display = 'none';
        card.classList.remove('open');
        toggleButton.textContent = 'Ver Contato & Mapa';
    } else {
        detalhes.style.display = 'block';
        card.classList.add('open');
        toggleButton.textContent = 'Fechar Detalhes';
    }
}


// ========================================================== 
// 4. INICIALIZAÇÃO ÚNICA (window.onload)
// ========================================================== 

window.onload = function() {
    window.scrollTo(0, 0); 
    
    // Alerta Temporário
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
    
    // Constrói os cards imediatamente - ISSO AGORA ESTÁ GARANTIDO
    construirCardsVacinacao(); 
};