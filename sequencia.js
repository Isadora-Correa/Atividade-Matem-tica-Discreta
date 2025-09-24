const botaoCalcular = document.getElementById('botaoCalcular');
const inputNumero = document.getElementById('numeroInput');
const divResultado = document.getElementById('resultado');

// Função para executar o cálculo e exibir a sequência
function calcularSequencia() {
    // Pega o valor do input e converte para número
    let numero = parseInt(inputNumero.value);

    // Limpa os resultados anteriores
    divResultado.innerHTML = '';

    // Valida se o número é válido
    if (isNaN(numero) || numero <= 0) {
        divResultado.innerHTML = '<p class="text-red-500 font-medium text-center">Por favor, digite um número inteiro e positivo.</p>';
        return;
    }

    // Cria um parágrafo inicial com o número
    let sequenciaHTML = `<p class="font-semibold text-gray-700 mb-2">Iniciando com: <strong class="text-blue-600">${numero}</strong></p>`;
    
    // Adiciona uma lista para os passos
    sequenciaHTML += '<ul class="list-none space-y-1">';

    // Loop para continuar o cálculo até o número ser 1
    while (numero > 1) {
        // Se o número for par
        if (numero % 2 === 0) {
            let proximoNumero = numero / 2;
            sequenciaHTML += `<li class="text-gray-600">⇢ ${numero} é <span class="font-semibold text-green-600">par</span>, dividindo por 2 = <strong class="text-black">${proximoNumero}</strong></li>`;
            numero = proximoNumero;
        } else { // Se o número for ímpar
            let proximoNumero = numero + 1;
            sequenciaHTML += `<li class="text-gray-600">⇢ ${numero} é <span class="font-semibold text-orange-600">ímpar</span>, somando 1 = <strong class="text-black">${proximoNumero}</strong></li>`;
            numero = proximoNumero;
        }
         // Adiciona uma verificação para evitar loops infinitos muito longos
        if (divResultado.childElementCount > 200) {
            sequenciaHTML += `<li class="text-red-500 font-bold">A sequência é muito longa para ser exibida.</li>`;
            break;
        }
    }

    sequenciaHTML += '</ul>';
    
    // Adiciona a mensagem final
    sequenciaHTML += '<p class="mt-4 font-bold text-center text-blue-700">Cálculo finalizado!</p>';

    // Exibe a sequência completa no HTML
    divResultado.innerHTML = sequenciaHTML;
}

// Adiciona o evento de clique ao botão
botaoCalcular.addEventListener('click', calcularSequencia);

// Permite que o usuário pressione "Enter" para calcular
inputNumero.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calcularSequencia();
    }
});