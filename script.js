let chartType = null;

function changeChartType (type, parameters) {
    chartType = type
    console.log(chartType);

    showFunctionParameters(parameters);
}

function showFunctionParameters(parameters) {
    // Ukrywanie katoegorii canvasa i czyszczenie go jeśli istniał przed wybraniem
    document.getElementById('function-chart').style.display = 'none';
    let canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = '';

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
    submitButton.innerHTML = `<button class="btn btn-green" onclick="generateChart()">Wygeneruj wykres</button>`
    inputsDiv.appendChild(submitButton);
}

function generateChart() {
    document.getElementById('function-chart').style.display = 'block';

    // Tworzenie canvasa i umieszczanie na nim lini z wartościami na osiach
    generateClearCanvas()


    // Generowanie wykresu zależnie od wybranej funkcji
    let result

    switch (chartType) {
        case 'linear': {
            a = parseInt(document.getElementById('parameter-input-a').value)
            b = parseInt(document.getElementById('parameter-input-b').value)

            myGraph.drawEquation(function(x) {
                return (a*x)+b;
            }, 'green', 3);
        }; break;
        case 'quadratic': {
            a = parseInt(document.getElementById('parameter-input-a').value)
            b = parseInt(document.getElementById('parameter-input-b').value)
            c = parseInt(document.getElementById('parameter-input-c').value)

            myGraph.drawEquation(function(x) {
                return (a*(x*x))+(b*x)+c;
            }, 'green', 3);
        }; break;
        case 'hyperbole': {
            a = parseInt(document.getElementById('parameter-input-a').value)

            myGraph.drawEquation(function(x) {
                return a/x;
            }, 'green', 3);
        }; break;
        case 'logarithmic': {
            function calculateLogarithm(base, x) {
                var a = Math.log(x);
                var b = Math.log(base);

                return a / b;
            }

            a = parseInt(document.getElementById('parameter-input-a').value)

            myGraph.drawEquation(function(x) {
                return calculateLogarithm(a,x);
            }, 'green', 3);
        }; break;
        case 'exponential': {
            a = parseInt(document.getElementById('parameter-input-a').value)

            myGraph.drawEquation(function(x) {
                return Math.pow(a,x);
            }, 'green', 3);
        }; break;
    }

    myGraph.drawEquation(function(x) {
        return result;
    }, 'red', 3);
}

function generateClearCanvas() {
    let canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = '';

    // Dodawanie canvasu do pustego diva
    let canvasTag = document.createElement('div');
    canvasTag.innerHTML = `<canvas id="canvas" width="700px" height="450px" style="border:1px solid rgba(149, 149, 149);">Your browser does not support the HTML 5 Canvas.</canvas>`
    canvasContainer.appendChild(canvasTag);

    function Graph(config) {
        // user defined properties
        this.canvas = document.getElementById(config.canvasId);
        this.minX = config.minX;
        this.minY = config.minY;
        this.maxX = config.maxX;
        this.maxY = config.maxY;
        this.unitsPerTick = config.unitsPerTick;

        // constants
        this.axisColor = '#aaa';
        this.font = '8pt Calibri';
        this.tickSize = 20;

        // relationships
        this.context = this.canvas.getContext('2d');
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = this.canvas.width / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = this.canvas.width / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;

        // draw x and y axis
        this.drawXAxis();
        this.drawYAxis();
    }

    Graph.prototype.drawXAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo(this.canvas.width, this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        var xPosIncrement = this.unitsPerTick * this.unitX;
        var xPos, unit;
        context.font = this.font;
        context.textAlign = 'center';
        context.textBaseline = 'top';

        // draw left tick marks
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while(xPos > 0) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit -= this.unitsPerTick;
            xPos = Math.round(xPos - xPosIncrement);
        }

        // draw right tick marks
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while(xPos < this.canvas.width) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit += this.unitsPerTick;
            xPos = Math.round(xPos + xPosIncrement);
        }

        context.restore();
    };

    Graph.prototype.drawYAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 0);
        context.lineTo(this.centerX, this.canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        var yPosIncrement = this.unitsPerTick * this.unitY;
        var yPos, unit;
        context.font = this.font;
        context.textAlign = 'right';
        context.textBaseline = 'middle';

        // draw top tick marks
        yPos = this.centerY - yPosIncrement;
        unit = this.unitsPerTick;
        while(yPos > 0) {
            context.moveTo(this.centerX - this.tickSize / 2, yPos);
            context.lineTo(this.centerX + this.tickSize / 2, yPos);
            context.stroke();
            context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
            unit += this.unitsPerTick;
            yPos = Math.round(yPos - yPosIncrement);
        }

        // draw bottom tick marks
        yPos = this.centerY + yPosIncrement;
        unit = -1 * this.unitsPerTick;
        while(yPos < this.canvas.height) {
            context.moveTo(this.centerX - this.tickSize / 2, yPos);
            context.lineTo(this.centerX + this.tickSize / 2, yPos);
            context.stroke();
            context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
            unit -= this.unitsPerTick;
            yPos = Math.round(yPos + yPosIncrement);
        }

        context.restore();
    };

    Graph.prototype.drawEquation = function(equation, color, thickness) {
        var context = this.context;
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        context.moveTo(this.minX, equation(this.minX));

        for(var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
            context.lineTo(x, equation(x));
        }

        context.restore();
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    };

    Graph.prototype.transformContext = function() {
    var context = this.context;

    // move context to center of canvas
    this.context.translate(this.centerX, this.centerY);

    /*
    * stretch grid to fit the canvas window, and
    * invert the y scale so that that increments
    * as you move upwards
    */
    context.scale(this.scaleX, -this.scaleY);
    };

    myGraph = new Graph({
        canvasId: 'canvas',
        minX: -10,
        minY: -10,
        maxX: 10,
        maxY: 10,
        unitsPerTick: 1
    });
}

