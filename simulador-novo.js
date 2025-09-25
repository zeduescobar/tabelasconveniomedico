// Simulador de Planos - JavaScript Limpo e Funcional
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simulador carregado com sucesso!');
    
    // Elementos principais
    const passos = {
        1: document.getElementById('passo-1'),
        2: document.getElementById('passo-2'),
        3: document.getElementById('passo-3'),
        4: document.getElementById('passo-4'),
        5: document.getElementById('passo-5')
    };
    
    // Botões
    const botoes = {
        iniciar: document.getElementById('btn-iniciar'),
        anterior2: document.getElementById('btn-anterior-2'),
        avancar2: document.getElementById('btn-avancar-2'),
        anterior3: document.getElementById('btn-anterior-3'),
        avancar3: document.getElementById('btn-avancar-3'),
        anterior4: document.getElementById('btn-anterior-4'),
        avancar4: document.getElementById('btn-avancar-4'),
        voltar5: document.getElementById('btn-voltar-5'),
        gerarTabela: document.getElementById('btn-gerar-tabela')
    };
    
    // Campos
    const campos = {
        estado: document.getElementById('estado'),
        cidade: document.getElementById('cidade'),
        possuiPlano: document.getElementById('possui-plano'),
        operadora: document.getElementById('operadora'),
        operadoraField: document.getElementById('operadora-field'),
        possuiCnpj: document.getElementById('possui-cnpj'),
        formacaoField: document.getElementById('formacao-field'),
        profissaoField: document.getElementById('profissao-field'),
        diplomaField: document.getElementById('diploma-field'),
        cnpjFields: document.getElementById('cnpj-fields'),
        formacaoAcademica: document.getElementById('formacao-academica'),
        profissao: document.getElementById('profissao'),
        contatoFinal: document.getElementById('contato-final')
    };
    
    // Função para navegar entre passos
    function navegarPasso(de, para) {
        console.log(`Navegando do passo ${de} para ${para}`);
        
        // Esconder passo atual
        if (passos[de]) {
            passos[de].classList.remove('ativo');
        }
        
        // Mostrar próximo passo
        if (passos[para]) {
            passos[para].classList.add('ativo');
        }
    }
    
    // Passo 1: Iniciar Simulação
    botoes.iniciar.addEventListener('click', function() {
        console.log('Botão iniciar clicado');
        
        if (campos.estado.value && campos.cidade.value) {
            navegarPasso(1, 2);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
    
    // Passo 2: Controle do campo operadora
    campos.possuiPlano.addEventListener('change', function() {
        console.log('Possui plano mudou para:', this.value);
        
        if (this.value === 'sim') {
            campos.operadoraField.classList.add('visivel');
        } else {
            campos.operadoraField.classList.remove('visivel');
        }
    });
    
    // Passo 2: Anterior
    botoes.anterior2.addEventListener('click', function() {
        console.log('Botão anterior 2 clicado');
        navegarPasso(2, 1);
    });
    
    // Passo 2: Avançar
    botoes.avancar2.addEventListener('click', function() {
        console.log('Botão avançar 2 clicado');
        
        if (campos.possuiPlano.value) {
            if (campos.possuiPlano.value === 'sim' && !campos.operadora.value) {
                alert('Por favor, informe a operadora/seguradora.');
                return;
            }
            navegarPasso(2, 3);
        } else {
            alert('Por favor, responda se possui plano atualmente.');
        }
    });
    
    // Passo 3: Controle dos campos condicionais
    campos.possuiCnpj.addEventListener('change', function() {
        console.log('Possui CNPJ mudou para:', this.value);
        
        if (this.value === 'nao') {
            campos.formacaoField.classList.add('visivel');
            campos.cnpjFields.classList.remove('visivel');
        } else if (this.value === 'sim') {
            campos.cnpjFields.classList.add('visivel');
            campos.formacaoField.classList.remove('visivel');
            campos.profissaoField.classList.remove('visivel');
            campos.diplomaField.classList.remove('visivel');
        } else {
            campos.formacaoField.classList.remove('visivel');
            campos.cnpjFields.classList.remove('visivel');
            campos.profissaoField.classList.remove('visivel');
            campos.diplomaField.classList.remove('visivel');
        }
    });
    
    campos.formacaoAcademica.addEventListener('change', function() {
        console.log('Formação acadêmica mudou para:', this.value);
        
        if (this.value === 'profissional-liberal') {
            campos.profissaoField.classList.add('visivel');
        } else {
            campos.profissaoField.classList.remove('visivel');
            campos.diplomaField.classList.remove('visivel');
        }
    });
    
    campos.profissao.addEventListener('change', function() {
        console.log('Profissão mudou para:', this.value);
        
        if (this.value) {
            campos.diplomaField.classList.add('visivel');
        } else {
            campos.diplomaField.classList.remove('visivel');
        }
    });
    
    // Passo 3: Anterior
    botoes.anterior3.addEventListener('click', function() {
        console.log('Botão anterior 3 clicado');
        navegarPasso(3, 2);
    });
    
    // Passo 3: Avançar
    botoes.avancar3.addEventListener('click', function() {
        console.log('Botão avançar 3 clicado');
        
        if (campos.possuiCnpj.value) {
            // Validações para pessoa física
            if (campos.possuiCnpj.value === 'nao') {
                if (!campos.formacaoAcademica.value) {
                    alert('Por favor, selecione sua formação acadêmica.');
                    return;
                }
                if (campos.formacaoAcademica.value === 'profissional-liberal' && !campos.profissao.value) {
                    alert('Por favor, selecione sua profissão.');
                    return;
                }
                if (campos.profissao.value && !document.getElementById('possui-diploma').value) {
                    alert('Por favor, responda se possui diploma.');
                    return;
                }
            }
            // Validações para pessoa jurídica
            else if (campos.possuiCnpj.value === 'sim') {
                if (!document.getElementById('plano-pessoas').value) {
                    alert('Por favor, selecione para quantas pessoas é o plano.');
                    return;
                }
                if (!document.getElementById('cnpj').value) {
                    alert('Por favor, informe seu CNPJ.');
                    return;
                }
                if (!document.getElementById('ramo-negocio').value) {
                    alert('Por favor, informe o ramo do seu negócio.');
                    return;
                }
            }
            
            navegarPasso(3, 4);
        } else {
            alert('Por favor, responda se possui CNPJ.');
        }
    });
    
    // Passo 4: Anterior
    botoes.anterior4.addEventListener('click', function() {
        console.log('Botão anterior 4 clicado');
        navegarPasso(4, 3);
    });
    
    // Passo 4: Avançar
    botoes.avancar4.addEventListener('click', function() {
        console.log('Botão avançar 4 clicado');
        
        // Calcular total de adultos (19+ anos)
        const idadesAdultos = [
            'idade-19-23', 'idade-24-28', 'idade-29-33', 'idade-34-38',
            'idade-39-43', 'idade-44-48', 'idade-49-53', 'idade-54-58', 'idade-59-plus'
        ];
        
        let totalAdultos = 0;
        
        idadesAdultos.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento && elemento.value) {
                const valor = parseInt(elemento.value);
                totalAdultos += (valor === 999) ? 10 : valor;
            }
        });
        
        console.log('Total de adultos:', totalAdultos);
        
        if (totalAdultos < 1) {
            const alerta = document.getElementById('alerta-adulto');
            if (alerta) alerta.classList.add('visivel');
            return;
        } else {
            const alerta = document.getElementById('alerta-adulto');
            if (alerta) alerta.classList.remove('visivel');
        }
        
        navegarPasso(4, 5);
    });
    
    // Passo 5: Voltar
    botoes.voltar5.addEventListener('click', function() {
        console.log('Botão voltar 5 clicado');
        navegarPasso(5, 4);
    });
    
    // Máscara de telefone
    campos.contatoFinal.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 2) {
                this.value = value;
            } else if (value.length <= 7) {
                this.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 11) {
                this.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        }
    });
    
    // Passo 5: Gerar Tabela
    botoes.gerarTabela.addEventListener('click', function() {
        console.log('Botão gerar tabela clicado');
        
        const nome = document.getElementById('nome-final').value;
        const contato = document.getElementById('contato-final').value;
        const email = document.getElementById('email-final').value;
        const modalidade = document.getElementById('modalidade-final').value;
        
        if (!nome || !contato || !email || !modalidade) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        alert('Tabela gerada com sucesso! Em breve implementaremos a exibição da tabela.');
    });
    
    console.log('Simulador configurado com sucesso!');
});
