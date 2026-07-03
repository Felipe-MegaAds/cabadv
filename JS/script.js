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
