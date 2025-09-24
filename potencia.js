const botaoCalcular = document.getElementById('botaoCalcular');
const baseInput = document.getElementById('baseInput');
const expoenteInput = document.getElementById('expoenteInput');
const divResultado = document.getElementById('resultado');

/**
 * Função recursiva simplificada para calcular a potência.
 * A responsabilidade de mostrar os passos foi movida para a função de exibição.
 * @param {number} base - O número base.
 * @param {number} expoente - O expoente.
 * @returns {number} O resultado de base^expoente.
 */
function calcularPotenciaRecursiva(base, expoente) {
    // Caso base: qualquer número elevado a 0 é 1.
    if (expoente === 0) {
        return 1;
    }
    // Passo recursivo
    else {
        return base * calcularPotenciaRecursiva(base, expoente - 1);
    }
}

// Função principal para montar e exibir o resultado e o passo a passo
function exibirCalculo() {
    const base = parseInt(baseInput.value);
    const expoente = parseInt(expoenteInput.value);

    // Validação dos inputs
    if (isNaN(base) || isNaN(expoente)) {
        divResultado.innerHTML = '<p class="text-red-500 font-medium text-center">Por favor, digite valores válidos para a base e o expoente.</p>';
        return;
    }

    if (expoente < 0 || !Number.isInteger(expoente)) {
        divResultado.innerHTML = '<p class="text-red-500 font-medium text-center">Este exemplo funciona apenas com expoentes inteiros e não-negativos.</p>';
        return;
    }

    // Array que guardará a visualização do caminho
    const passosHtml = [];
    
    // Calcula o resultado final primeiro
    const resultado = calcularPotenciaRecursiva(base, expoente);
    
    // Monta o passo a passo no formato da imagem
    passosHtml.push(`<li>b<sup>e</sup> = b x b<sup>e-1</sup>;</li>`);
    passosHtml.push(`<li><b>b = ${base}</b>;</li>`);
    passosHtml.push(`<li><b>e = ${expoente}</b>.</li>`);

    // Lida com o caso base e o passo recursivo
    if (expoente === 0) {
        passosHtml.push(`<li>O expoente é 0, o resultado é <b>1</b> (caso base).</li>`);
    } else {
        const expoenteMenosUm = expoente - 1;
        passosHtml.push(`<li>${base}<sup>${expoente}</sup> = ${base} x ${base}<sup>${expoente}-1</sup>;</li>`);
        passosHtml.push(`<li>${base}<sup>${expoente}</sup> = ${base} x ${base}<sup>${expoenteMenosUm}</sup>;</li>`);
        
        const resultadoRecursivo = calcularPotenciaRecursiva(base, expoenteMenosUm);
        
        passosHtml.push(`<li>${resultado} = ${base} x ${resultadoRecursivo};</li>`);
        passosHtml.push(`<li><b>${resultado} = ${resultado}</b>.</li>`);
    }

    // Junta todos os passos em uma única string HTML, usando uma lista
    const logCompleto = `<ul class="list-disc list-inside">${passosHtml.join('')}</ul>`;

    // Exibe o resultado formatado e o caminho completo
    divResultado.innerHTML = `
        <p class="text-center text-gray-700">O resultado de 
            <strong class="text-green-700">${base}</strong> elevado a 
            <strong class="text-green-700">${expoente}</strong> é:
        </p>
        <p class="text-center text-4xl font-bold text-gray-900 mt-2">${resultado}</p>
        
        <details class="mt-6 text-sm" open>
            <summary class="cursor-pointer text-blue-600 hover:underline">Ver o passo a passo do cálculo</summary>
            <div class="mt-2 p-3 bg-gray-100 border rounded-md font-mono text-sm">
                ${logCompleto}
            </div>
        </details>
    `;
}

// Adiciona o evento de clique ao botão
botaoCalcular.addEventListener('click', exibirCalculo);

// Permite que o usuário pressione "Enter" em qualquer um dos inputs para calcular
[baseInput, expoenteInput].forEach(input => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            exibirCalculo();
        }
    });
});