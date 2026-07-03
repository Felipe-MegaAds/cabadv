/* ==========================================================================
   CONFIGURAÇÃO DO MENU MOBILE (HAMBÚRGUER)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos do menu hambúrguer e menu de navegação
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abre e fecha o menu mobile ao clicar no botão hambúrguer
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Fecha o menu mobile automaticamente ao clicar em qualquer link de seção
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
});

/* ==========================================================================
   EFEITO DE REDUÇÃO E BLUR DO HEADER AO ROLAR A PÁGINA (SCROLL HEADER)
   ========================================================================== */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    
    // Adiciona classe se rolou mais de 50 pixels
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ==========================================================================
   ANIMAÇÃO SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    // Configuração do observador: dispara quando 15% do elemento estiver visível
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona classe de ativação para disparar transição CSS
                entry.target.classList.add('active');
                // Deixa de observar o elemento após a animação inicial
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Margem inferior sutil para melhor timing visual
    });

    // Registra todos os elementos marcados para revelação
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

/* ==========================================================================
   CONTADOR DE NÚMEROS ANIMADO (ESTATÍSTICAS)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    // Função de animação de incremento
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        let count = 0;
        
        // Define velocidades de incremento adaptadas aos valores alvo
        const duration = 2000; // Duração total em milissegundos
        const stepTime = Math.max(Math.floor(duration / target), 15); // Define tempo de atualização mínimo de 15ms
        
        const timer = setInterval(() => {
            // Aceleração para números grandes (como 2.000)
            if (target > 500) {
                count += Math.ceil(target / 80); // Incrementos maiores
            } else {
                count++;
            }

            // Verifica se alcançou ou ultrapassou o objetivo
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }

            // Atualiza o texto na tela formatado de acordo com a seção
            if (target === 98) {
                element.textContent = count + '%';
            } else {
                element.textContent = '+' + count.toLocaleString('pt-BR');
            }
        }, stepTime);
    };

    // Observador para disparar o contador apenas quando a seção estiver visível
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, {
        threshold: 0.5 // Dispara quando 50% do card estatístico estiver visível
    });

    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
});

/* ==========================================================================
   CARROSSEL DE DEPOIMENTOS AUTOMÁTICO E MANUAL (DOTS)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000; // Transição automática a cada 6 segundos

    // Função para alterar o slide ativo
    const goToSlide = (index) => {
        // Remove classes ativas de todos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Adiciona classe ativa no slide e dot especificado
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    // Avança para o próximo slide
    const nextSlide = () => {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        goToSlide(next);
    };

    // Inicia ciclo de troca automática
    const startSlideShow = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    };

    // Pausa ciclo de troca automática (útil ao clicar manualmente)
    const resetSlideShow = () => {
        clearInterval(slideInterval);
        startSlideShow();
    };

    // Registra evento de clique manual nos dots de navegação
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const clickedIndex = parseInt(e.target.getAttribute('data-index'), 10);
            goToSlide(clickedIndex);
            resetSlideShow(); // Reinicia o timer para evitar transição rápida imediata
        });
    });

    // Inicia o slider automaticamente
    if (slides.length > 0) {
        startSlideShow();
    }
});

/* ==========================================================================
   MARCAÇÃO DE LINK ATIVO NO MENU COM BASE NA SEÇÃO VISÍVEL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Monitora a rolagem para mudar a classe active dos links de navegação
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        // Verifica qual seção está mais próxima do topo da viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajusta o offset em 150px para dar tempo do menu mudar conforme o scroll se aproxima
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Aplica a classe active no link correspondente
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});

/* ==========================================================================
   LOGICA DO WIDGET FLUTUANTE DO WHATSAPP (BALÃO DE CHAT E FECHAMENTO)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const whatsappWidget = document.getElementById('whatsappWidget');
    const whatsappChatBox = document.getElementById('whatsappChatBox');
    const closeChatBtn = document.getElementById('closeChatBtn');
    
    // Armazena no sessionStorage se o usuário fechou o balão manualmente nesta sessão
    const isChatClosed = sessionStorage.getItem('whatsappChatClosed');

    // Abre o balão de chat automaticamente após 3 segundos do carregamento
    if (!isChatClosed) {
        setTimeout(() => {
            whatsappChatBox.classList.add('active');
        }, 3000);
    }

    // Fecha o balão ao clicar no botão "X" e grava a escolha na sessão
    closeChatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Impede o clique de se propagar para o widget
        whatsappChatBox.classList.remove('active');
        sessionStorage.setItem('whatsappChatClosed', 'true');
    });

    // No mobile (onde não há hover ativo natural confiável), o clique no widget alterna o balão
    // caso ele não esteja aberto. Se estiver aberto, abre o link do WhatsApp
    const whatsappBtn = document.getElementById('whatsappBtn');
    whatsappBtn.addEventListener('click', (e) => {
        // Se a tela for pequena e o chatbox não estiver ativo, mostramos o chatbox primeiro
        if (window.innerWidth <= 768 && !whatsappChatBox.classList.contains('active') && !sessionStorage.getItem('whatsappChatClosed')) {
            e.preventDefault();
            whatsappChatBox.classList.add('active');
        }
    });
});

/* ==========================================================================
   LÓGICA DA SEÇÃO FAQ (ACCORDION DE EXPANSÃO SUAVE)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de pergunta da FAQ
    const faqButtons = document.querySelectorAll('.faq-question-btn');

    // Associa o evento de clique para cada botão
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answerPanel = faqItem.querySelector('.faq-answer-panel');
            const isCurrentlyActive = faqItem.classList.contains('active');

            // Fecha todos os outros itens da FAQ que estiverem abertos no momento
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== faqItem) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-answer-panel').style.maxHeight = null;
                    activeItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
                }
            });

            // Alterna o estado de ativo do item clicado
            if (!isCurrentlyActive) {
                // Adiciona a classe active para rotacionar a seta e mudar cor do título
                faqItem.classList.add('active');
                // Define o max-height com base na altura real do conteúdo para expansão suave
                answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
                button.setAttribute('aria-expanded', 'true');
            } else {
                // Remove a classe active e zera o max-height para recolher o conteúdo
                faqItem.classList.remove('active');
                answerPanel.style.maxHeight = null;
                button.setAttribute('aria-expanded', 'false');
            }
        });
    });
});

/* ==========================================================================
   RASTREAMENTO DE CONVERSÕES DO WHATSAPP PARA TRÁFEGO PAGO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os links do site que apontam para o domínio do WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="api.whatsapp.com"], a[href*="wa.me"]');
    
    // Associa o evento de clique a cada link do WhatsApp para registrar conversão nas campanhas
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 1. Envio de evento de conversão para o Facebook Pixel (Meta Ads), se ativo na página
            if (typeof fbq === 'function') {
                fbq('track', 'Contact', {
                    content_name: 'Clique Botão WhatsApp',
                    value: 0.00,
                    currency: 'BRL'
                });
            }
            
            // 2. Envio de evento para o Google Tag / Google Analytics 4, se inicializado no site
            if (typeof gtag === 'function') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'Conversao',
                    'event_label': link.href
                });
            }
            
            // 3. Disparo para a camada de dados do Google Tag Manager (DataLayer), se presente na página
            if (typeof dataLayer !== 'undefined' && Array.isArray(dataLayer)) {
                dataLayer.push({
                    'event': 'whatsapp_click',
                    'click_url': link.href
                });
            }
        });
    });
});

/* ==========================================================================
   CONTROLE DO BANNER DE COOKIES (LGPD) E MODAL DE PRIVACIDADE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos relacionados a cookies e política de privacidade
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
    const privacyModal = document.getElementById('privacyModal');
    const openPrivacyModalBtn = document.getElementById('openPrivacyModalBtn');
    const openPrivacyModalCookie = document.getElementById('openPrivacyModalCookie');
    const closePrivacyModal = document.getElementById('closePrivacyModal');
    const btnOkPrivacy = document.getElementById('btnOkPrivacy');

    // 1. Controle de exibição do Banner de Cookies
    // Verifica no localStorage se o usuário já aceitou os cookies anteriormente
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        // Exibe o banner adicionando a classe active se o consentimento ainda não existir
        cookieBanner.classList.add('active');
    }

    // Grava a aceitação de cookies no localStorage ao clicar no botão Aceitar
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('active');
    });

    // 2. Funções auxiliares para Abrir e Fechar o Modal de Privacidade
    const openModal = (e) => {
        e.preventDefault();
        privacyModal.classList.add('active');
        // Impede a rolagem do fundo da página enquanto o modal de termos estiver aberto
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        privacyModal.classList.remove('active');
        // Restaura a rolagem do corpo da página ao fechar o modal
        document.body.style.overflow = '';
    };

    // Associa eventos de clique nos links para abrir o modal de privacidade
    if (openPrivacyModalBtn) openPrivacyModalBtn.addEventListener('click', openModal);
    if (openPrivacyModalCookie) openPrivacyModalCookie.addEventListener('click', openModal);

    // Associa eventos de fechar o modal ao clicar no 'X', no botão Entendi ou fora do card
    if (closePrivacyModal) closePrivacyModal.addEventListener('click', closeModal);
    if (btnOkPrivacy) btnOkPrivacy.addEventListener('click', closeModal);
    
    // Fecha o modal se o usuário clicar no fundo escurecido fora do card central
    privacyModal.addEventListener('click', (e) => {
        if (e.target === privacyModal) {
            closeModal();
        }
    });
});
