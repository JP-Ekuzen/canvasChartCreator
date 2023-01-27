var chartType

function editFunctionImage (url) {

    function changeFunctionVisibility (visibile) {
        const mainDiv = document.getElementById("function-pattern")
        if (visibile) mainDiv.style.display = 'block';
        else mainDiv.style.display = 'none';
    }

    var fullUrl
    if (url) fullUrl = 'https://latex.codecogs.com/svg.latex?\\Large&space;' + url;
    else fullUrl = url

    const imageTag = document.getElementById("function-pattern-img")
    imageTag.setAttribute('src', fullUrl);

    if (url) changeFunctionVisibility(true);
    else changeFunctionVisibility(false);
}

function editChartInputs (inputArray) {

    // Clear old inputs.
    document.getElementById('chart-inputs').innerHTML = "";

    const mainDiv = document.getElementById("chart-inputs")

    for (obj of inputArray) {
        let inputField = document.createElement('div');
        inputField.innerHTML = `<span>Argument (${obj})</span>
                                <input type="text" id="chart-input-${obj}" name="chart-input-${obj}" required>`

        mainDiv.appendChild(inputField)
    }
}

function changeSettings () {
    chartType = document.getElementById("chart-type-select").value;

    switch (chartType) {
        case '': {
            editFunctionImage('');
            editChartInputs([]);
        }; break;
        case 'linear': {
            editFunctionImage('y=ax+b');
            editChartInputs(['a', 'b']);
        }; break;
        case 'quadratic': {
            editFunctionImage('f(x)={x}^2');
            editChartInputs(['x']);
        }; break;
        case 'hyperbola': {
            editFunctionImage('f(x)=\\frac{a}{x}');
            editChartInputs(['a', 'x']);
        }; break;
        case 'logarithmic': {
            editFunctionImage('f(x)=log_{a}x');
            editChartInputs(['a', 'x']);
        }; break;
    }
}