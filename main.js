function set_tema(cor_primaria, cor_secundaria) {
    const root = document.documentElement;
    root.style.setProperty('--cor-primaria', cor_primaria);
    root.style.setProperty('--cor-secundaria', cor_secundaria);
    
    const elementos = document.querySelectorAll('.bg-blue-600, .text-blue-600, .border-blue-600, .ring-blue-500, .hover\\:bg-blue-700, .hover\\:text-blue-600');
    elementos.forEach(el => {
        el.className = el.className.replace(/blue-\d+/g, cor_primaria);
    });
}

set_tema('blue-600', 'blue-100');

document.addEventListener('DOMContentLoaded', function() {
    const menuMobileBtn = document.getElementById('menu-mobile-btn');
    const menuMobile = document.getElementById('menu-mobile');
    const lgpdLink = document.getElementById('lgpd-link');
    const lgpdModal = document.getElementById('lgpd-modal');
    const closeLgpdModal = document.getElementById('close-lgpd-modal');
    const formOrcamento = document.getElementById('form-orcamento');
    const orcamentoSuccess = document.getElementById('orcamento-success');
    const telefoneOrcamento = document.getElementById('telefone-orcamento');
    
    const filtrosPlano = document.querySelectorAll('.filtro-plano');
    const cardsPlano = document.querySelectorAll('.plano-card');
    
    const cardsBlog = document.querySelectorAll('.blog-card');
    
    const linksSmooth = document.querySelectorAll('a[href^="#"]');
    
    function toggleMenuMobile() {
        menuMobile.classList.toggle('hidden');
    }
    
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
    
    function formatarTelefone(telefone) {
        const numeros = telefone.replace(/\D/g, '');
        if (numeros.length >= 11) {
            return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7,11)}`;
        } else if (numeros.length >= 7) {
            return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6,10)}`;
        } else if (numeros.length >= 3) {
            return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
        } else if (numeros.length >= 1) {
            return `(${numeros}`;
        }
        return numeros;
    }
    
    function validarFormulario(formData) {
        const nome = formData.get('nome').trim();
        const telefone = formData.get('telefone').trim();
        const lgpd = formData.get('lgpd');
        
        if (!nome) {
            alert('lorem ipsum');
            return false;
        }
        
        if (!telefone) {
            alert('lorem ipsum');
            return false;
        }
        
        if (!lgpd) {
            alert('lorem ipsum');
            return false;
        }
        
        return true;
    }
    
    function validarFormularioOrcamento(formData) {
        const nomeCompleto = formData.get('nome-completo').trim();
        const email = formData.get('email-orcamento').trim();
        const telefone = formData.get('telefone-orcamento').trim();
        const modalidade = formData.get('modalidade');
        
        if (!nomeCompleto) {
            alert('lorem ipsum');
            return false;
        }
        
        if (!email) {
            alert('lorem ipsum');
            return false;
        }
        
        if (!telefone) {
            alert('lorem ipsum');
            return false;
        }
        
        if (!modalidade) {
            alert('lorem ipsum');
            return false;
        }
        
        return true;
    }
    
    function filtrarPlanos(tipo) {
        cardsPlano.forEach(card => {
            if (card.dataset.tipo === tipo) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    
    function atualizarFiltrosAtivos(filtros, tipoAtivo) {
        filtros.forEach(filtro => {
            filtro.classList.remove('active');
            if (filtro.dataset.tipo === tipoAtivo || filtro.dataset.tag === tipoAtivo) {
                filtro.classList.add('active');
            }
        });
    }
    
    menuMobileBtn.addEventListener('click', toggleMenuMobile);
    
    linksSmooth.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            if (window.innerWidth < 768) {
                menuMobile.classList.add('hidden');
            }
        });
    });
    
    telefoneOrcamento.addEventListener('blur', function() {
        this.value = formatarTelefone(this.value);
    });
    
    telefoneOrcamento.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
    
    formOrcamento.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        if (validarFormularioOrcamento(formData)) {
            orcamentoSuccess.classList.remove('hidden');
            this.reset();
            
            setTimeout(() => {
                orcamentoSuccess.classList.add('hidden');
            }, 5000);
        }
    });
    
    
    lgpdLink.addEventListener('click', function(e) {
        e.preventDefault();
        lgpdModal.classList.remove('hidden');
    });
    
    closeLgpdModal.addEventListener('click', function() {
        lgpdModal.classList.add('hidden');
    });
    
    lgpdModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
        }
    });
    
    filtrosPlano.forEach(filtro => {
        filtro.addEventListener('click', function() {
            const tipo = this.dataset.tipo;
            filtrarPlanos(tipo);
            atualizarFiltrosAtivos(filtrosPlano, tipo);
        });
    });
    
    // Mostrar todos os planos por padrão
    cardsPlano.forEach(card => {
        card.style.display = 'block';
    });
    
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    const elementosAnimacao = document.querySelectorAll('.plano-card, .blog-card');
    elementosAnimacao.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
    
    const botaoWhatsapp = document.querySelector('a[href*="wa.me"]');
    if (botaoWhatsapp) {
        botaoWhatsapp.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            window.open(url, '_blank');
        });
    }
    
    const ctaButtons = document.querySelectorAll('button, .cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-blue-500');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-blue-500');
        });
    });
    
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
    
    const handleResize = debounce(function() {
        if (window.innerWidth >= 768) {
            menuMobile.classList.add('hidden');
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    
    const metricas = document.querySelectorAll('[class*="text-3xl font-bold"]');
    metricas.forEach(metrica => {
        const valor = parseInt(metrica.textContent);
        if (!isNaN(valor)) {
            let contador = 0;
            const incremento = valor / 50;
            const timer = setInterval(() => {
                contador += incremento;
                if (contador >= valor) {
                    metrica.textContent = valor + (metrica.textContent.includes('+') ? '+' : '') + (metrica.textContent.includes('%') ? '%' : '');
                    clearInterval(timer);
                } else {
                    metrica.textContent = Math.floor(contador) + (metrica.textContent.includes('+') ? '+' : '') + (metrica.textContent.includes('%') ? '%' : '');
                }
            }, 30);
        }
    });
    
    const cards = document.querySelectorAll('.plano-card, .blog-card, .operadora-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-blue-600');
                    link.classList.add('text-gray-700');
                });
                
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-gray-700');
                    activeLink.classList.add('text-blue-600');
                }
            }
        });
    }
    
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
    
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 hidden';
    loadingSpinner.innerHTML = '<div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>';
    document.body.appendChild(loadingSpinner);
    
    function showLoading() {
        loadingSpinner.classList.remove('hidden');
    }
    
    function hideLoading() {
        loadingSpinner.classList.add('hidden');
    }
    
    window.addEventListener('load', function() {
        hideLoading();
        document.body.classList.add('loaded');
    });
    
    const performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'navigation') {
                console.log('lorem ipsum:', entry.loadEventEnd - entry.loadEventStart);
            }
        });
    });
    
    performanceObserver.observe({ entryTypes: ['navigation'] });
    
    const errorHandler = (event) => {
        console.error('lorem ipsum:', event.error);
    };
    
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-40';
    themeToggle.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';
    themeToggle.style.display = 'none';
    document.body.appendChild(themeToggle);
    
    const accessibilityFeatures = {
        skipToContent: () => {
            const main = document.querySelector('main');
            if (main) {
                main.focus();
                main.scrollIntoView();
            }
        },
        
        announcePageChange: (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    };
    
    const skipLink = document.createElement('a');
    skipLink.href = '#inicio';
    skipLink.textContent = 'lorem ipsum';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        accessibilityFeatures.skipToContent();
    });
    
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    trapFocus(lgpdModal);
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        const animatedElements = document.querySelectorAll('*');
        animatedElements.forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.animationIterationCount = '1';
            el.style.transitionDuration = '0.01ms';
        });
    }
    
    const highContrastMode = window.matchMedia('(prefers-contrast: high)');
    
    if (highContrastMode.matches) {
        document.body.classList.add('high-contrast');
    }
    
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (colorScheme.matches) {
        document.body.classList.add('dark-mode');
    }
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection && connection.effectiveType === 'slow-2g') {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.loading = 'eager';
        });
    }
    
    const serviceWorkerRegistration = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('lorem ipsum');
                })
                .catch(error => {
                    console.log('lorem ipsum');
                });
        }
    };
    
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', serviceWorkerRegistration);
    }
    
    const analytics = {
        track: (event, data) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', event, data);
            }
        },
        
        trackFormSubmission: () => {
            analytics.track('form_submit', {
                event_category: 'engagement',
                event_label: 'simulacao'
            });
        },
        
        trackFilterUsage: (filterType, filterValue) => {
            analytics.track('filter_used', {
                event_category: 'engagement',
                event_label: `${filterType}_${filterValue}`
            });
        }
    };
    
    
    filtrosPlano.forEach(filtro => {
        filtro.addEventListener('click', function() {
            analytics.trackFilterUsage('plano', this.dataset.tipo);
        });
    });
    
    
    const keyboardNavigation = {
        handleKeydown: (e) => {
            if (e.key === 'Escape') {
                if (!menuMobile.classList.contains('hidden')) {
                    menuMobile.classList.add('hidden');
                }
                if (!lgpdModal.classList.contains('hidden')) {
                    lgpdModal.classList.add('hidden');
                }
            }
        }
    };
    
    document.addEventListener('keydown', keyboardNavigation.handleKeydown);
    
    const formValidation = {
        validateField: (field) => {
            const value = field.value.trim();
            const fieldType = field.type;
            const isRequired = field.hasAttribute('required');
            
            if (isRequired && !value) {
                field.classList.add('border-red-500');
                field.classList.remove('border-green-500');
                return false;
            }
            
            if (fieldType === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    field.classList.add('border-red-500');
                    field.classList.remove('border-green-500');
                    return false;
                }
            }
            
            if (fieldType === 'tel' && value) {
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(value)) {
                    field.classList.add('border-red-500');
                    field.classList.remove('border-green-500');
                    return false;
                }
            }
            
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
            return true;
        }
    };
    
    
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    };
    
    lazyLoadImages();
    
    const preloadCriticalResources = () => {
        const criticalImages = [
            'assets/quem-somos.jpg',
            'assets/plano-individual.jpg',
            'assets/plano-familiar.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    };
    
    preloadCriticalResources();
    
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
    };
    
    optimizeImages();
    
    const handleOffline = () => {
        const offlineMessage = document.createElement('div');
        offlineMessage.className = 'fixed top-4 left-4 right-4 bg-yellow-500 text-white p-4 rounded-lg z-50 text-center';
        offlineMessage.textContent = 'lorem ipsum';
        document.body.appendChild(offlineMessage);
        
        setTimeout(() => {
            document.body.removeChild(offlineMessage);
        }, 5000);
    };
    
    const handleOnline = () => {
        const onlineMessage = document.createElement('div');
        onlineMessage.className = 'fixed top-4 left-4 right-4 bg-green-500 text-white p-4 rounded-lg z-50 text-center';
        onlineMessage.textContent = 'lorem ipsum';
        document.body.appendChild(onlineMessage);
        
        setTimeout(() => {
            document.body.removeChild(onlineMessage);
        }, 3000);
    };
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    const performanceMetrics = {
        measurePageLoad: () => {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log('lorem ipsum:', loadTime + 'ms');
            });
        },
        
        measureFirstContentfulPaint: () => {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        console.log('lorem ipsum:', entry.startTime + 'ms');
                    }
                });
            });
            
            observer.observe({ entryTypes: ['paint'] });
        }
    };
    
    performanceMetrics.measurePageLoad();
    performanceMetrics.measureFirstContentfulPaint();
    
    const accessibilityEnhancements = {
        addAriaLabels: () => {
            const buttons = document.querySelectorAll('button:not([aria-label])');
            buttons.forEach(button => {
                if (!button.textContent.trim()) {
                    button.setAttribute('aria-label', 'lorem ipsum');
                }
            });
        },
        
        addFocusIndicators: () => {
            const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
            focusableElements.forEach(el => {
                el.addEventListener('focus', function() {
                    this.style.outline = '2px solid #3b82f6';
                    this.style.outlineOffset = '2px';
                });
                
                el.addEventListener('blur', function() {
                    this.style.outline = 'none';
                });
            });
        }
    };
    
    accessibilityEnhancements.addAriaLabels();
    accessibilityEnhancements.addFocusIndicators();
    
    const seoOptimizations = {
        addStructuredData: () => {
            const breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "lorem ipsum",
                        "item": window.location.origin
                    }
                ]
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(breadcrumbSchema);
            document.head.appendChild(script);
        },
        
        optimizeMetaTags: () => {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
            }
        }
    };
    
    seoOptimizations.addStructuredData();
    seoOptimizations.optimizeMetaTags();
    
    const conversionTracking = {
        trackCtaClicks: () => {
            const ctaButtons = document.querySelectorAll('a[href*="wa.me"], button[type="submit"]');
            ctaButtons.forEach(button => {
                button.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'cta_click', {
                            event_category: 'conversion',
                            event_label: this.textContent.trim()
                        });
                    }
                });
            });
        },
        
        trackScrollDepth: () => {
            let maxScroll = 0;
            window.addEventListener('scroll', () => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                    if (maxScroll % 25 === 0 && typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            event_category: 'engagement',
                            event_label: `${maxScroll}%`
                        });
                    }
                }
            });
        }
    };
    
    conversionTracking.trackCtaClicks();
    conversionTracking.trackScrollDepth();
    
    const errorReporting = {
        reportError: (error, context) => {
            console.error('lorem ipsum:', error, context);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: error.message,
                    fatal: false
                });
            }
        },
        
        setupErrorHandling: () => {
            window.addEventListener('error', (event) => {
                errorReporting.reportError(event.error, 'javascript_error');
            });
            
            window.addEventListener('unhandledrejection', (event) => {
                errorReporting.reportError(event.reason, 'promise_rejection');
            });
        }
    };
    
    errorReporting.setupErrorHandling();
    
    const userExperience = {
        addLoadingStates: () => {
            // Formulário removido - sem loading states necessários
        },
        
        addHoverEffects: () => {
            const interactiveElements = document.querySelectorAll('button, a, .plano-card, .blog-card, .operadora-card');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02)';
                    this.style.transition = 'transform 0.2s ease';
                });
                
                el.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        }
    };
    
    userExperience.addLoadingStates();
    userExperience.addHoverEffects();
    
    const formOrcamentoFields = document.querySelectorAll('#form-orcamento input, #form-orcamento select');
    formOrcamentoFields.forEach(field => {
        field.addEventListener('blur', function() {
            formValidation.validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('border-red-500')) {
                formValidation.validateField(this);
            }
        });
    });
    
    const mobileOptimizations = {
        addTouchGestures: () => {
            let startY = 0;
            let startX = 0;
            
            document.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
            });
            
            document.addEventListener('touchend', (e) => {
                const endY = e.changedTouches[0].clientY;
                const endX = e.changedTouches[0].clientX;
                const diffY = startY - endY;
                const diffX = startX - endX;
                
                if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                    if (diffY > 0) {
                        console.log('lorem ipsum');
                    } else {
                        console.log('lorem ipsum');
                    }
                }
            });
        },
        
        optimizeForMobile: () => {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                }
            }
        }
    };
    
    mobileOptimizations.addTouchGestures();
    mobileOptimizations.optimizeForMobile();
    
    const securityEnhancements = {
        addCSPHeaders: () => {
            const meta = document.createElement('meta');
            meta.httpEquiv = 'Content-Security-Policy';
            meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;";
            document.head.appendChild(meta);
        },
        
        sanitizeInputs: () => {
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                });
            });
        }
    };
    
    securityEnhancements.addCSPHeaders();
    securityEnhancements.sanitizeInputs();
    
    const dataLayer = window.dataLayer = window.dataLayer || [];
    
    function gtag() {
        dataLayer.push(arguments);
    }
    
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    
    const customEvents = {
        trackFormInteraction: (fieldName, action) => {
            gtag('event', 'form_interaction', {
                event_category: 'engagement',
                event_label: `${fieldName}_${action}`
            });
        },
        
        trackFilterInteraction: (filterType, filterValue) => {
            gtag('event', 'filter_interaction', {
                event_category: 'engagement',
                event_label: `${filterType}_${filterValue}`
            });
        }
    };
    
    
    const filterButtons = document.querySelectorAll('.filtro-plano');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = 'plano';
            const filterValue = this.dataset.tipo;
            customEvents.trackFilterInteraction(filterType, filterValue);
        });
    });
    
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
    
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeIn 0.6s ease-in-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        .focus\:not-sr-only:focus {
            position: static;
            width: auto;
            height: auto;
            padding: inherit;
            margin: inherit;
            overflow: visible;
            clip: auto;
            white-space: normal;
        }
        
        .high-contrast {
            filter: contrast(150%);
        }
        
        .dark-mode {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        
        .filtro-plano, .filtro-blog {
            padding: 8px 16px;
            border-radius: 20px;
            background-color: #f3f4f6;
            color: #6b7280;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .filtro-plano.active, .filtro-blog.active {
            background-color: #3b82f6;
            color: white;
        }
        
        .filtro-plano:hover, .filtro-blog:hover {
            background-color: #e5e7eb;
        }
        
        .filtro-plano.active:hover, .filtro-blog.active:hover {
            background-color: #2563eb;
        }
    `;
    document.head.appendChild(style);
});
