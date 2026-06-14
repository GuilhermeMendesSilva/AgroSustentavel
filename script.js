// Aguarda todo o HTML ser carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. HEADER DINÂMICO AO ROLAR A PÁGINA
       ========================================================================== */
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        // Se a página for rolada mais de 50 pixels, adiciona uma classe de estilo
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.04)";
            header.style.backgroundColor = "rgba(250, 249, 246, 0.98)";
        } else {
            header.style.boxShadow = "border-bottom: 1px solid rgba(0, 0, 0, 0.04)";
            header.style.backgroundColor = "rgba(250, 249, 246, 0.95)";
        }
    });

    /* ==========================================================================
       2. EFEITO REVELAR AO ROLAR (SCROLL REVEAL SUAVE)
       ========================================================================== */
    // Seleciona todos os cards e seções que queremos animar
    const elementosAnimados = document.querySelectorAll(".card, .introducao, .destaque-texto, .beneficios-conteudo");

    // Configuração do Observador que detecta quando o elemento aparece na tela
    const observadorOpcoes = {
        root: null, // Usa a janela do navegador como referência
        threshold: 0.15, // O elemento precisa estar 15% visível para ativar
        rootMargin: "0px 0px -50px 0px" // Ativa um pouco antes do elemento chegar totalmente
    };

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            // Se o elemento entrou na área visível
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
                // Deixa de observar o elemento após a animação acontecer uma vez
                observador.unobserve(entrada.target.value);
            }
        });
    }, observadorOpcoes);

    // Aplica o estilo inicial escondido e começa a observar cada elemento
    elementosAnimados.forEach(elemento => {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(30px)";
        elemento.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        observador.observe(elemento);
    });

    /* ==========================================================================
       3. ENVIO EFICIENTE E SOFT DO FORMULÁRIO
       ========================================================================== */
    const formulario = document.getElementById("form-contato");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            // Impede que a página recarregue ao enviar o formulário
            evento.preventDefault();

            // Captura os dados digitados pelo usuário
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;

            // Cria o container da mensagem de sucesso com estilo soft integrado
            const secaoContato = document.querySelector(".contato-secao");

            // Suaviza a saída do formulário atual
            formulario.style.transition = "opacity 0.5s ease";
            formulario.style.opacity = "0";

            setTimeout(() => {
                // Remove o formulário antigo visualmente
                formulario.style.display = "none";

                // Cria o bloco de agradecimento
                const mensagemSucesso = document.createElement("div");
                mensagemSucesso.className = "feedback-sucesso";
                mensagemSucesso.style.opacity = "0";
                mensagemSucesso.style.transition = "opacity 0.5s ease";
                mensagemSucesso.style.padding = "30px";
                mensagemSucesso.style.backgroundColor = "var(--bg-secundario)";
                mensagemSucesso.style.borderRadius = "16px";
                mensagemSucesso.style.marginTop = "20px";

                mensagemSucesso.innerHTML = `
                    <h3 style="color: var(--verde-forte); margin-bottom: 10px;">Obrigado pelo contato, ${nome}!</h3>
                    <p style="color: var(--texto-claro); font-size: 15px;">Sua mensagem foi registrada com sucesso para o projeto Agrinho 2026. Responderemos em breve no e-mail: <strong>${email}</strong>.</p>
                `;

                // Adiciona a mensagem na tela
                secaoContato.appendChild(mensagemSucesso);

                // Faz a mensagem aparecer suavemente (fade-in)
                setTimeout(() => {
                    mensagemSucesso.style.opacity = "1";
                }, 50);

            }, 500);
        });
    }
});