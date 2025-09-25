// Simulador de Planos - JavaScript Separado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simulador carregado');
    
    // Elementos principais
    const passos = {
        1: document.getElementById('passo-1'),
        2: document.getElementById('passo-2'),
        3: document.getElementById('passo-3'),
        4: document.getElementById('passo-4'),
        5: document.getElementById('passo-5')
    };
    
    // Botões de navegação
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
    
    // Campos do formulário
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
    
    // Verificar se todos os elementos existem
    console.log('Elementos encontrados:', {
        passos: Object.keys(passos).map(k => `${k}: ${!!passos[k]}`),
        botoes: Object.keys(botoes).map(k => `${k}: ${!!botoes[k]}`),
        campos: Object.keys(campos).map(k => `${k}: ${!!campos[k]}`)
    });
    
    // Função para navegar entre passos
    function navegarPasso(de, para) {
        console.log(`Navegando do passo ${de} para ${para}`);
        console.log('Elementos:', {
            passoDe: passos[de] ? 'encontrado' : 'não encontrado',
            passoPara: passos[para] ? 'encontrado' : 'não encontrado'
        });
        
        if (passos[de]) {
            console.log('Escondendo passo', de);
            passos[de].classList.add('hidden');
        }
        if (passos[para]) {
            console.log('Mostrando passo', para);
            passos[para].classList.remove('hidden');
        }
        
        console.log('Classes finais:', {
            passo2: passos[2] ? passos[2].className : 'não encontrado',
            passo3: passos[3] ? passos[3].className : 'não encontrado'
        });
    }
    
    // Passo 1: Iniciar Simulação
    if (botoes.iniciar) {
        botoes.iniciar.addEventListener('click', function() {
            console.log('Botão iniciar clicado');
            if (campos.estado && campos.cidade && campos.estado.value && campos.cidade.value) {
                navegarPasso(1, 2);
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Controle do campo operadora no Passo 2
    if (campos.possuiPlano) {
        campos.possuiPlano.addEventListener('change', function() {
            console.log('Possui plano mudou para:', this.value);
            if (campos.operadoraField) {
                if (this.value === 'sim') {
                    campos.operadoraField.classList.remove('hidden');
                } else {
                    campos.operadoraField.classList.add('hidden');
                }
            }
        });
    }
    
    // Passo 2: Anterior
    if (botoes.anterior2) {
        botoes.anterior2.addEventListener('click', function() {
            console.log('Botão anterior 2 clicado');
            navegarPasso(2, 1);
        });
    }
    
    // Passo 2: Avançar
    if (botoes.avancar2) {
        botoes.avancar2.addEventListener('click', function() {
            console.log('Botão avançar 2 clicado');
            console.log('Valores:', {
                possuiPlano: campos.possuiPlano ? campos.possuiPlano.value : 'campo não encontrado',
                operadora: campos.operadora ? campos.operadora.value : 'campo não encontrado'
            });
            
            if (campos.possuiPlano && campos.possuiPlano.value) {
                if (campos.possuiPlano.value === 'sim' && campos.operadora && !campos.operadora.value) {
                    alert('Por favor, informe a operadora/seguradora.');
                    return;
                }
                console.log('Tentando navegar do passo 2 para 3');
                navegarPasso(2, 3);
                console.log('Navegação executada');
            } else {
                alert('Por favor, responda se possui plano atualmente.');
            }
        });
    }
    
    // Controle dos campos condicionais no Passo 3
    if (campos.possuiCnpj) {
        campos.possuiCnpj.addEventListener('change', function() {
            console.log('Possui CNPJ mudou para:', this.value);
            if (this.value === 'nao') {
                if (campos.formacaoField) campos.formacaoField.classList.remove('hidden');
                if (campos.cnpjFields) campos.cnpjFields.classList.add('hidden');
            } else if (this.value === 'sim') {
                if (campos.cnpjFields) campos.cnpjFields.classList.remove('hidden');
                if (campos.formacaoField) campos.formacaoField.classList.add('hidden');
                if (campos.profissaoField) campos.profissaoField.classList.add('hidden');
                if (campos.diplomaField) campos.diplomaField.classList.add('hidden');
            } else {
                if (campos.formacaoField) campos.formacaoField.classList.add('hidden');
                if (campos.cnpjFields) campos.cnpjFields.classList.add('hidden');
                if (campos.profissaoField) campos.profissaoField.classList.add('hidden');
                if (campos.diplomaField) campos.diplomaField.classList.add('hidden');
            }
        });
    }
    
    if (campos.formacaoAcademica) {
        campos.formacaoAcademica.addEventListener('change', function() {
            console.log('Formação acadêmica mudou para:', this.value);
            if (campos.profissaoField) {
                if (this.value === 'profissional-liberal') {
                    campos.profissaoField.classList.remove('hidden');
                } else {
                    campos.profissaoField.classList.add('hidden');
                    if (campos.diplomaField) campos.diplomaField.classList.add('hidden');
                }
            }
        });
    }
    
    if (campos.profissao) {
        campos.profissao.addEventListener('change', function() {
            console.log('Profissão mudou para:', this.value);
            if (campos.diplomaField) {
                if (this.value) {
                    campos.diplomaField.classList.remove('hidden');
                } else {
                    campos.diplomaField.classList.add('hidden');
                }
            }
        });
    }
    
    // Passo 3: Anterior
    if (botoes.anterior3) {
        botoes.anterior3.addEventListener('click', function() {
            console.log('Botão anterior 3 clicado');
            navegarPasso(3, 2);
        });
    }
    
    // Passo 3: Avançar
    if (botoes.avancar3) {
        botoes.avancar3.addEventListener('click', function() {
            console.log('Botão avançar 3 clicado');
            if (campos.possuiCnpj && campos.possuiCnpj.value) {
                // Validações específicas para cada caso
                if (campos.possuiCnpj.value === 'nao') {
                    if (campos.formacaoAcademica && !campos.formacaoAcademica.value) {
                        alert('Por favor, selecione sua formação acadêmica.');
                        return;
                    }
                    if (campos.formacaoAcademica && campos.formacaoAcademica.value === 'profissional-liberal' && campos.profissao && !campos.profissao.value) {
                        alert('Por favor, selecione sua profissão.');
                        return;
                    }
                    if (campos.profissao && campos.profissao.value && !document.getElementById('possui-diploma').value) {
                        alert('Por favor, responda se possui diploma.');
                        return;
                    }
                } else if (campos.possuiCnpj.value === 'sim') {
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
    }
    
    // Passo 4: Anterior
    if (botoes.anterior4) {
        botoes.anterior4.addEventListener('click', function() {
            console.log('Botão anterior 4 clicado');
            navegarPasso(4, 3);
        });
    }
    
    // Passo 4: Avançar
    if (botoes.avancar4) {
        botoes.avancar4.addEventListener('click', function() {
            console.log('Botão avançar 4 clicado');
            // Calcular total de adultos (19+ anos)
            const idadesAdultos = ['idade-19-23', 'idade-24-28', 'idade-29-33', 'idade-34-38', 'idade-39-43', 'idade-44-48', 'idade-49-53', 'idade-54-58', 'idade-59-plus'];
            let totalAdultos = 0;
            
            idadesAdultos.forEach(id => {
                const elemento = document.getElementById(id);
                if (elemento) {
                    const valor = elemento.value;
                    if (valor && valor !== '') {
                        const num = parseInt(valor);
                        totalAdultos += (num === 999) ? 10 : num;
                    }
                }
            });
            
            console.log('Total de adultos:', totalAdultos);
            
            if (totalAdultos < 1) {
                const alerta = document.getElementById('alerta-adulto');
                if (alerta) alerta.classList.remove('hidden');
                return;
            } else {
                const alerta = document.getElementById('alerta-adulto');
                if (alerta) alerta.classList.add('hidden');
            }
            
            navegarPasso(4, 5);
        });
    }
    
    // Passo 5: Voltar
    if (botoes.voltar5) {
        botoes.voltar5.addEventListener('click', function() {
            console.log('Botão voltar 5 clicado');
            navegarPasso(5, 4);
        });
    }
    
    // Máscara de telefone
    if (campos.contatoFinal) {
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
    }
    
    // Passo 5: Gerar Tabela
    if (botoes.gerarTabela) {
        botoes.gerarTabela.addEventListener('click', function() {
            console.log('Botão gerar tabela clicado');
            const nome = document.getElementById('nome-final');
            const contato = document.getElementById('contato-final');
            const email = document.getElementById('email-final');
            const modalidade = document.getElementById('modalidade-final');
            
            if (!nome || !contato || !email || !modalidade || 
                !nome.value || !contato.value || !email.value || !modalidade.value) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            alert('Tabela gerada com sucesso! Em breve implementaremos a exibição da tabela.');
        });
    }
    
    console.log('Simulador configurado com sucesso');
});
