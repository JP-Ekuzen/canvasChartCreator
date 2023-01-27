var chartType

function editFunctionImage (url) {

    function changeFunctionVisibility (visibile) {
        const obj = document.getElementById("function-pattern")
        if (visibile) obj.style.display = 'block';
        else obj.style.display = 'none';
    }

    var fullUrl
    if (url) fullUrl = 'https://latex.codecogs.com/svg.latex?\\Large&space;' + url;
    else fullUrl = url

    const obj = document.getElementById("function-pattern-img")
    obj.setAttribute('src', fullUrl);

    if (url) changeFunctionVisibility(true);
    else changeFunctionVisibility(false);
}

function editChartInputs () {

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