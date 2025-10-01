// main-clean.js - Versão limpa e otimizada (SEM COMMIT)
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const menuMobileBtn = document.getElementById('menu-mobile-btn');
    const menuMobile = document.getElementById('menu-mobile');
    const lgpdLink = document.getElementById('lgpd-link') || null;
    const lgpdModal = document.getElementById('lgpd-modal') || null;
    const closeLgpdModal = document.getElementById('close-lgpd-modal') || null;
    const formOrcamento = document.getElementById('form-orcamento') || null;
    const orcamentoSuccess = document.getElementById('orcamento-success') || null;
    const telefoneOrcamento = document.getElementById('telefone-orcamento') || null;
    
    const filtrosPlano = document.querySelectorAll('.filtro-plano');
    const cardsPlano = document.querySelectorAll('.plano-card');
    const cardsBlog = document.querySelectorAll('.blog-card');
    const linksSmooth = document.querySelectorAll('a[href^="#"]');
    
    // Função para toggle do menu mobile
    function toggleMenuMobile() {
        menuMobile.classList.toggle('hidden');
    }
    
    // Função para scroll suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Formatação de telefone
    function formatarTelefone(telefone) {
        let valor = telefone.value.replace(/\D/g, '');
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        telefone.value = valor;
    }
    
    // Validação de formulário
    function validarFormulario(formData) {
        const erros = [];
        
        if (!formData.estado) erros.push('Estado é obrigatório');
        if (!formData.cidade) erros.push('Cidade é obrigatória');
        if (!formData.idade) erros.push('Idade é obrigatória');
        if (!formData.telefone) erros.push('Telefone é obrigatório');
        
        return erros;
    }
    
    // Validação do formulário de orçamento
    function validarFormularioOrcamento(formData) {
        const erros = [];
        
        if (!formData.telefone) erros.push('Telefone é obrigatório');
        if (!formData.lgpd) erros.push('Você deve aceitar a política de privacidade');
        
        return erros;
    }
    
    // Filtro de planos
    function filtrarPlanos(tipo) {
        cardsPlano.forEach(card => {
            const cardTipo = card.dataset.tipo;
            if (tipo === 'todos' || cardTipo === tipo) {
                card.style.display = 'block';
                card.classList.add('animate-fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Atualizar filtros ativos
    function atualizarFiltrosAtivos(filtros, tipoAtivo) {
        filtros.forEach(filtro => {
            filtro.classList.remove('active');
            if (filtro.dataset.tipo === tipoAtivo) {
                filtro.classList.add('active');
            }
        });
    }
    
    // Event listeners principais
    if (menuMobileBtn) {
        menuMobileBtn.addEventListener('click', toggleMenuMobile);
    }
    
    // Links de scroll suave
    linksSmooth.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            if (menuMobile && !menuMobile.classList.contains('hidden')) {
                menuMobile.classList.add('hidden');
            }
        });
    });
    
    // Formatação de telefone
    if (telefoneOrcamento) {
        telefoneOrcamento.addEventListener('blur', function() {
            formatarTelefone(this);
        });
        
        telefoneOrcamento.addEventListener('input', function() {
            formatarTelefone(this);
        });
    }
    
    // Formulário de orçamento
    if (formOrcamento) {
        formOrcamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                telefone: telefoneOrcamento.value,
                lgpd: document.getElementById('lgpd-checkbox').checked
            };
            
            const erros = validarFormularioOrcamento(formData);
            
            if (erros.length > 0) {
                alert('Erros encontrados:\n' + erros.join('\n'));
                return;
            }
            
            // Simular envio
            if (orcamentoSuccess) {
                orcamentoSuccess.classList.remove('hidden');
                formOrcamento.reset();
            }
        });
    }
    
    // Modal LGPD
    if (lgpdLink) {
        lgpdLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (lgpdModal) {
                lgpdModal.classList.remove('hidden');
            }
        });
    }
    
    if (closeLgpdModal) {
        closeLgpdModal.addEventListener('click', function() {
            if (lgpdModal) {
                lgpdModal.classList.add('hidden');
            }
        });
    }
    
    if (lgpdModal) {
        lgpdModal.addEventListener('click', function(e) {
            if (e.target === lgpdModal) {
                lgpdModal.classList.add('hidden');
            }
        });
    }
    
    // Filtros de planos
    filtrosPlano.forEach(filtro => {
        filtro.addEventListener('click', function() {
            const tipo = this.dataset.tipo;
            filtrarPlanos(tipo);
            atualizarFiltrosAtivos(filtrosPlano, tipo);
        });
    });
    
    // Scroll para mostrar/ocultar botão WhatsApp
    window.addEventListener('scroll', function() {
        const botaoWhatsapp = document.querySelector('.fixed.bottom-6.right-6');
        if (botaoWhatsapp) {
            if (window.scrollY > 300) {
                botaoWhatsapp.style.opacity = '1';
                botaoWhatsapp.style.transform = 'translateY(0)';
            } else {
                botaoWhatsapp.style.opacity = '0';
                botaoWhatsapp.style.transform = 'translateY(20px)';
            }
        }
    });
    
    // Efeitos de hover para botões
    const botoes = document.querySelectorAll('button, .btn, a[class*="bg-"]');
    botoes.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeitos de foco para inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3b82f6';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#d1d5db';
        });
    });
    
    // Debounce para resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Handle resize
    const handleResize = debounce(function() {
        if (window.innerWidth >= 768) {
            if (menuMobile) {
                menuMobile.classList.add('hidden');
            }
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.onload = function() {
            this.classList.add('loaded');
        };
        imageObserver.observe(img);
    });
    
    // Efeitos de hover para cards
    cardsPlano.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    });
    
    // Atualizar link ativo na navegação
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Loading states
    function showLoading() {
        document.body.classList.add('loading');
    }
    
    function hideLoading() {
        document.body.classList.remove('loading');
    }
    
    // Page load
    window.addEventListener('load', function() {
        hideLoading();
        updateActiveNavLink();
    });
    
    // Scroll para atualizar navegação
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
    
    // Skip link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Filtros de blog (se existirem)
    const filtrosBlog = document.querySelectorAll('.filtro-blog');
    if (filtrosBlog.length > 0) {
        filtrosBlog.forEach(filtro => {
            filtro.addEventListener('click', function() {
                const tag = this.dataset.tag;
                filtrarBlog(tag);
                atualizarFiltrosAtivos(filtrosBlog, tag);
            });
        });
    }
    
    // Função para filtrar blog
    function filtrarBlog(tag) {
        cardsBlog.forEach(card => {
            const cardTag = card.dataset.tag;
            if (tag === 'todos' || cardTag === tag) {
                card.style.display = 'block';
                card.classList.add('animate-fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Intersection Observer para animações
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    const animatedElements = document.querySelectorAll('.plano-card, .blog-card, .operadora-card, section');
    animatedElements.forEach(el => {
        intersectionObserver.observe(el);
    });
    
    // Mobile optimizations
    const mobileOptimizations = {
        addTouchGestures: () => {
            let startY = 0;
            let startX = 0;
            
            document.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
            });
            
            document.addEventListener('touchmove', (e) => {
                if (!startY || !startX) return;
                
                const currentY = e.touches[0].clientY;
                const currentX = e.touches[0].clientX;
                const diffY = startY - currentY;
                const diffX = startX - currentX;
                
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    e.preventDefault();
                }
            });
        },
        
        optimizeForMobile: () => {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
                }
            }
        }
    };
    
    mobileOptimizations.addTouchGestures();
    mobileOptimizations.optimizeForMobile();
});
