let chartType = null;

function changeChartType (type, parameters) {
    chartType = type
    console.log(chartType);

    showFunctionParameters(parameters);
}

function showFunctionParameters(parameters) {
    // Pokazywanie i czyszczenie wszystkiego w divie.
    document.getElementById('function-parameters').style.display = 'block';
    document.getElementById('function-parameters-inputs').innerHTML = '';

    inputsDiv = document.getElementById('function-parameters-inputs');

    // Generowanie url z obrazkiem funkcji.
    let mathUrlFragment
    const mainUrl = 'https://latex.codecogs.com/svg.latex?\\Large&space;'

    switch (chartType) {
        case 'linear': mathUrlFragment = 'y=ax+b'; break;
        case 'quadratic': mathUrlFragment = 'f(x)={ax}^2+bx+c'; break;
        case 'hyperbole': mathUrlFragment = 'f(x)=\\frac{a}{x}'; break;
        case 'logarithmic': mathUrlFragment = 'f(x)=log_{a}x'; break;
        case 'exponential': mathUrlFragment = 'f(x)={a}^x'; break;
    }

    let imgFunctionPattern = document.createElement('div');
    imgFunctionPattern.innerHTML = `<img src="${mainUrl + mathUrlFragment}" style="margin:20px;"></img>`
    inputsDiv.appendChild(imgFunctionPattern);

    // Dodawanie pól z wartościami do uzupełnienia.
    for (symbol of parameters) {
        let inputField = document.createElement('div');
        inputField.innerHTML = `<label for="chart-input-${symbol}">Parametr (${symbol})</label>
                                <input type="number" class="input-parameter" id="parameter-input-${symbol}" name="parameter-input-${symbol}" required>`

        inputsDiv.appendChild(inputField);
    }

    // Dodawanie przycisku potwierdzającego generowanie wykresu.
    let submitButton = document.createElement('div');
    submitButton.innerHTML = `<button class="btn btn-green">Wygeneruj wykres</button>`
    inputsDiv.appendChild(submitButton);
}