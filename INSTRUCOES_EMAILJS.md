# Instruções para Configurar Template EmailJS

## Templates Criados

Criei dois templates profissionais para o EmailJS:

1. **`emailjs-template.html`** - Template completo (para simulador-novo.js)
2. **`emailjs-template-simple.html`** - Template simplificado (para simulador-simples.js)

## Como Configurar no EmailJS

### 1. Acesse o Dashboard do EmailJS
- Vá para: https://dashboard.emailjs.com/
- Faça login com sua conta

### 2. Crie um Novo Template
- Clique em "Email Templates"
- Clique em "Create New Template"
- Escolha "Custom" como tipo

### 3. Configure o Template Completo
- **Template ID**: `template_simulador_completo`
- **Subject**: `Nova Simulação de Plano de Saúde - {{nome}}`
- **Content**: Copie o conteúdo do arquivo `emailjs-template.html`

### 4. Configure o Template Simples
- **Template ID**: `template_simulador_simples`
- **Subject**: `Nova Simulação de Plano de Saúde - {{nome}}`
- **Content**: Copie o conteúdo do arquivo `emailjs-template-simple.html`

### 5. Atualize os IDs nos Arquivos JavaScript

#### Para simulador-simples.js:
```javascript
emailjs.send('service_7lksfa7', 'template_simulador_simples', templateParams)
```

#### Para simulador-novo.js:
```javascript
emailjs.send('service_7lksfa7', 'template_simulador_completo', templateParams)
```

## Dados Incluídos nos Templates

### Template Completo:
- Dados de contato (nome, telefone, email)
- Localização (estado, cidade)
- Detalhes do plano (tipo, faixa etária)
- Formação acadêmica (se preenchida)
- CNPJ (se preenchido)
- Composição familiar (adultos, crianças, idosos)
- Timestamp (data e hora)
- Origem da simulação

### Template Simples:
- Dados de contato (nome, telefone, email)
- Localização (estado, cidade)
- Detalhes do plano (tipo, faixa etária detalhada, total de pessoas)
- Timestamp (data e hora)
- Origem da simulação

## Características dos Templates

- **Design Responsivo**: Funciona em desktop e mobile
- **Cores Profissionais**: Azul corporativo da VaiCom Saúde
- **Seções Organizadas**: Dados agrupados logicamente
- **Destaque Visual**: Campos importantes em destaque
- **Call-to-Action**: Próximos passos claros
- **Branding**: Logo e informações da empresa

## Próximos Passos

1. Copie o conteúdo dos templates para o EmailJS
2. Atualize os IDs nos arquivos JavaScript
3. Teste o envio de emails
4. Ajuste as cores/textos conforme necessário

## Suporte

Se precisar de ajuda com a configuração, entre em contato!
