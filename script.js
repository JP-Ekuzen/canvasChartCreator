let chartType = null;

function changeChartType (type, parameters) {
    chartType = type
    console.log(chartType);

    showFunctionParameters(parameters);
}

function showFunctionParameters(parameters) {
    document.getElementById('function-parameters').style.display = 'block';
    document.getElementById('function-parameters-inputs').innerHTML = '';

    inputsDiv = document.getElementById('function-parameters-inputs');

    for (symbol of parameters) {
        let inputField = document.createElement('div');
        inputField.innerHTML = `<label for="chart-input-${symbol}">Argument (${symbol})</label>
                                <input type="number" class="input-parameter" id="chart-input-${symbol}" name="chart-input-${symbol}" required>`

        inputsDiv.appendChild(inputField);
    }

    let submitButton = document.createElement('div');
    submitButton.innerHTML = `<button class="btn btn-green">Wygeneruj wykres</button>`
    inputsDiv.appendChild(submitButton);

}