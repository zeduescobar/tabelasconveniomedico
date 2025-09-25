// simulador-simples.js - Versão completa e funcional
document.addEventListener('DOMContentLoaded', function() {
    // Simulador carregado
    
    // Elementos
    const passos = {
        1: document.getElementById('passo-1'),
        2: document.getElementById('passo-2'),
        3: document.getElementById('passo-3'),
        4: document.getElementById('passo-4'),
        5: document.getElementById('passo-5')
    };

    // Função para navegar entre passos
    function mostrarPasso(numero) {
        // Esconder todos os passos
        Object.values(passos).forEach(passo => {
            if (passo) {
                passo.classList.add('hidden');
            }
        });
        
        // Mostrar o passo atual
        if (passos[numero]) {
            passos[numero].classList.remove('hidden');
            // Passo ${numero} mostrado
        }
    }

    // Passo 1 - Iniciar
    const btnIniciar = document.getElementById('btn-iniciar');
    if (btnIniciar) {
        btnIniciar.addEventListener('click', function() {
            const estado = document.getElementById('estado');
            const cidade = document.getElementById('cidade');
            
            if (estado.value && cidade.value) {
                mostrarPasso(2);
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Passo 2 - Possui plano
    const btnAvancar2 = document.getElementById('btn-avancar-2');
    const btnAnterior2 = document.getElementById('btn-anterior-2');
    const possuiPlano = document.getElementById('possui-plano');
    const operadoraField = document.getElementById('operadora-field');
    
    // Controle do campo operadora
    if (possuiPlano) {
        possuiPlano.addEventListener('change', function() {
            if (this.value === 'sim') {
                operadoraField.classList.remove('hidden');
            } else {
                operadoraField.classList.add('hidden');
            }
        });
    }
    
    if (btnAvancar2) {
        btnAvancar2.addEventListener('click', function() {
            const tipoPlano = document.getElementById('tipo-plano');
            const possuiPlanoValue = possuiPlano.value;
            const operadora = document.getElementById('operadora');
            
            if (!tipoPlano.value) {
                alert('Por favor, selecione o tipo de plano desejado.');
                return;
            }
            
            if (possuiPlanoValue) {
                if (possuiPlanoValue === 'sim' && !operadora.value) {
                    alert('Por favor, informe a operadora/seguradora.');
                    return;
                }
                mostrarPasso(3);
            } else {
                alert('Por favor, responda se possui plano atualmente.');
            }
        });
    }
    
    if (btnAnterior2) {
        btnAnterior2.addEventListener('click', function() {
            mostrarPasso(1);
        });
    }

    // Passo 3 - Perfil do usuário
    const btnAvancar3 = document.getElementById('btn-avancar-3');
    const btnAnterior3 = document.getElementById('btn-anterior-3');
    const possuiCnpj = document.getElementById('possui-cnpj');
    const formacaoField = document.getElementById('formacao-field');
    const profissaoField = document.getElementById('profissao-field');
    const diplomaField = document.getElementById('diploma-field');
    const cnpjFields = document.getElementById('cnpj-fields');
    const formacaoAcademica = document.getElementById('formacao-academica');
    const profissao = document.getElementById('profissao');
    
    // Controle dos campos condicionais no Passo 3
    if (possuiCnpj) {
        possuiCnpj.addEventListener('change', function() {
            if (this.value === 'nao') {
                formacaoField.classList.remove('hidden');
                cnpjFields.classList.add('hidden');
            } else if (this.value === 'sim') {
                cnpjFields.classList.remove('hidden');
                formacaoField.classList.add('hidden');
                profissaoField.classList.add('hidden');
                diplomaField.classList.add('hidden');
            } else {
                formacaoField.classList.add('hidden');
                cnpjFields.classList.add('hidden');
                profissaoField.classList.add('hidden');
                diplomaField.classList.add('hidden');
            }
        });
    }
    
    if (formacaoAcademica) {
        formacaoAcademica.addEventListener('change', function() {
            if (this.value === 'profissional-liberal') {
                profissaoField.classList.remove('hidden');
            } else {
                profissaoField.classList.add('hidden');
                diplomaField.classList.add('hidden');
            }
        });
    }
    
    if (profissao) {
        profissao.addEventListener('change', function() {
            if (this.value) {
                diplomaField.classList.remove('hidden');
            } else {
                diplomaField.classList.add('hidden');
            }
        });
    }
    
    if (btnAvancar3) {
        btnAvancar3.addEventListener('click', function() {
            const possuiCnpjValue = possuiCnpj.value;
            const formacaoAcademicaValue = formacaoAcademica.value;
            const profissaoValue = profissao.value;
            const possuiDiploma = document.getElementById('possui-diploma');
            const planoPessoas = document.getElementById('plano-pessoas');
            const cnpj = document.getElementById('cnpj');
            const ramoNegocio = document.getElementById('ramo-negocio');
            
            if (possuiCnpjValue) {
                if (possuiCnpjValue === 'nao') {
                    if (!formacaoAcademicaValue) {
                        alert('Por favor, selecione sua formação acadêmica.');
                        return;
                    }
                    if (formacaoAcademicaValue === 'profissional-liberal' && !profissaoValue) {
                        alert('Por favor, selecione sua profissão.');
                        return;
                    }
                    if (profissaoValue && !possuiDiploma.value) {
                        alert('Por favor, responda se possui diploma.');
                        return;
                    }
                } else if (possuiCnpjValue === 'sim') {
                    if (!planoPessoas.value) {
                        alert('Por favor, selecione para quantas pessoas é o plano.');
                        return;
                    }
                    if (!cnpj.value) {
                        alert('Por favor, informe seu CNPJ.');
                        return;
                    }
                    if (!ramoNegocio.value) {
                        alert('Por favor, informe o ramo do seu negócio.');
                        return;
                    }
                }
                mostrarPasso(4);
            } else {
                alert('Por favor, responda se possui CNPJ.');
            }
        });
    }
    
    if (btnAnterior3) {
        btnAnterior3.addEventListener('click', function() {
            mostrarPasso(2);
        });
    }

    // Passo 4 - Quantidade de pessoas
    const btnAvancar4 = document.getElementById('btn-avancar-4');
    const btnAnterior4 = document.getElementById('btn-anterior-4');
    
    if (btnAvancar4) {
        btnAvancar4.addEventListener('click', function() {
            const idadesAdultos = ['idade-19-23', 'idade-24-28', 'idade-29-33', 'idade-34-38', 'idade-39-43', 'idade-44-48', 'idade-49-53', 'idade-54-58', 'idade-59-plus'];
            let totalAdultos = 0;
            
            idadesAdultos.forEach(id => {
                const selectElement = document.getElementById(id);
                if (selectElement) {
                    const valor = selectElement.value;
                    if (valor && valor !== '') {
                        const num = parseInt(valor);
                        totalAdultos += (num === 999) ? 10 : num;
                    }
                }
            });
            
            if (totalAdultos < 1) {
                const alertaAdulto = document.getElementById('alerta-adulto');
                if (alertaAdulto) alertaAdulto.classList.remove('hidden');
                return;
            } else {
                const alertaAdulto = document.getElementById('alerta-adulto');
                if (alertaAdulto) alertaAdulto.classList.add('hidden');
            }
            
            mostrarPasso(5);
        });
    }
    
    if (btnAnterior4) {
        btnAnterior4.addEventListener('click', function() {
            mostrarPasso(3);
        });
    }

    // Passo 5 - Dados finais
    const btnVoltar5 = document.getElementById('btn-voltar-5');
    const btnGerarTabela = document.getElementById('btn-gerar-tabela');
    
    if (btnVoltar5) {
        btnVoltar5.addEventListener('click', function() {
            mostrarPasso(4);
        });
    }
    
    if (btnGerarTabela) {
        btnGerarTabela.addEventListener('click', function() {
            const nome = document.getElementById('nome-final');
            const contato = document.getElementById('contato-final');
            const email = document.getElementById('email-final');
            
            if (nome.value && contato.value && email.value) {
                alert('Tabela gerada com sucesso! Em breve implementaremos a exibição da tabela.');
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Simulador configurado com sucesso
});
