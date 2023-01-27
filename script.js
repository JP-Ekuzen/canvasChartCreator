var chartType

function changePatternImage () {
    const obj = document.getElementById("function-pattern-img")

    switch (chartType) {
        case '': obj.setAttribute('src', ""); break;
        case 'prosta': obj.setAttribute('src', "https://latex.codecogs.com/svg.latex?\\Large&space;y=ax+b"); break;
        case 'parabola': obj.setAttribute('src', "https://latex.codecogs.com/svg.latex?\\Large&space;f(x)={x}^2"); break;
        case 'hiperbola': obj.setAttribute('src', "https://latex.codecogs.com/svg.latex?\\Large&space;f(x)=\\frac{a}{x}"); break;
        case 'logarytmiczna': obj.setAttribute('src', "https://latex.codecogs.com/svg.latex?\\Large&space;f(x)=log_{a}x"); break;
    }
}

function changeSettings() {
    chartType = document.getElementById("chart-type-select").value;

    changePatternImage()
}