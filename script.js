var chartType

function changeFunctionPreview () {

    function changeVisibility (visibile) {
        const obj = document.getElementById("chart-function-pattern")
        if (visibile) obj.style.display = 'block';
        else obj.style.display = 'none';
    }

    function editImage (url) {
        const obj = document.getElementById("function-pattern-img")
        obj.setAttribute('src', url);

        if (url) changeVisibility(true);
        else changeVisibility(false);
    }

    switch (chartType) {
        case '': {
            editImage('');
        }; break;
        case 'linear': {
            editImage('https://latex.codecogs.com/svg.latex?\\Large&space;y=ax+b');
        }; break;
        case 'quadratic': {
            editImage('https://latex.codecogs.com/svg.latex?\\Large&space;f(x)={x}^2');
        }; break;
        case 'hyperbola': {
            editImage('https://latex.codecogs.com/svg.latex?\\Large&space;f(x)=\\frac{a}{x}');
        }; break;
        case 'logarithmic': {
            editImage('https://latex.codecogs.com/svg.latex?\\Large&space;f(x)=log_{a}x');
        }; break;
    }
}

function changeSettings() {
    chartType = document.getElementById("chart-type-select").value;

    changeFunctionPreview()
}