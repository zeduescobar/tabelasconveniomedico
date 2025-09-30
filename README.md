# Template Corretora de Planos de Saude

Template generico para corretoras de planos de saude desenvolvido com HTML, Tailwind CSS e JavaScript vanilla.

## Caracteristicas

- Design responsivo e acessivel
- Foco em conversao com CTAs estrategicos
- Formulario de simulacao com validacao
- Filtros de planos e posts do blog
- Integracao com WhatsApp
- LGPD com modal de politica
- Performance otimizada
- SEO friendly

## Estrutura

- `index.html` - Pagina principal
- `main.js` - Funcionalidades JavaScript
- `favicon.svg` - Icone do site
- `assets/` - Pasta com imagens placeholder

## Funcionalidades

### Menu Mobile
- Drawer responsivo para dispositivos moveis
- Navegacao suave entre secoes

### Formulario de Simulacao
- Validacao em tempo real
- Mascara de telefone automatica
- Checkbox LGPD obrigatorio
- Mensagem de sucesso apos envio

### Filtros
- Filtro de planos por tipo (individual, familiar, pme, empresarial, odontologico)
- Filtro de posts por tag (amil, bradesco, sulamerica)

### Acessibilidade
- HTML semantico
- Estados de foco visiveis
- Navegacao por teclado
- Skip links
- ARIA labels

### Performance
- Imagens com loading lazy
- Preload de recursos criticos
- Otimizacao para conexoes lentas
- Service Worker (opcional)

## Personalizacao

### Tema
Use a funcao `set_tema(cor_primaria, cor_secundaria)` para alterar as cores:

```javascript
set_tema('blue-600', 'blue-100'); // Tema azul (padrao)
set_tema('green-600', 'green-100'); // Tema verde
set_tema('purple-600', 'purple-100'); // Tema roxo
```

### Conteudo
Todos os textos sao "lorem ipsum" para facilitar a personalizacao. Substitua pelos textos reais da corretora.

### Imagens
As imagens estao configuradas para usar URLs do Unsplash. Substitua pelos assets reais da corretora.

## Uso

1. Abra `index.html` no navegador
2. Personalize o conteudo conforme necessario
3. Substitua as imagens placeholder pelos assets reais
4. Configure as cores usando `set_tema()`
5. Ajuste os links do WhatsApp e contato

## Requisitos

- Navegador moderno com suporte a ES6+
- Conexao com internet (para Tailwind CSS CDN)
- JavaScript habilitado

## Suporte

Template desenvolvido seguindo as melhores praticas de:
- Acessibilidade (WCAG 2.1)
- Performance (Core Web Vitals)
- SEO (Schema.org)
- Conversao (UX/UI)
