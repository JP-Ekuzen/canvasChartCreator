var chartType, myGraph

//  Zmiana podglądu wzoru na funkcje.
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

// Dodawanie oraz czyszczenie pól do wpisania wartości.
function editChartInputs (inputArray) {
    document.getElementById('chart-inputs').innerHTML = "";

    const mainDiv = document.getElementById("chart-inputs")

    for (obj of inputArray) {
        let inputField = document.createElement('div');
        inputField.innerHTML = `<label for="chart-input-${obj}">Argument (${obj})</label>
                                <input type="text" id="chart-input-${obj}" name="chart-input-${obj}" required>`

        mainDiv.appendChild(inputField)
    }
    if (inputArray.length) mainDiv.appendChild(document.createElement('hr'));
}

// Zmiana ustawień po zmianie wykresu przez użytkownika.
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
            editFunctionImage('f(x)={ax}^2+bx+c');
            editChartInputs(['a', 'b', 'c']);
        }; break;
        case 'hyperbole': {
            editFunctionImage('f(x)=\\frac{a}{x}');
            editChartInputs(['a']);
        }; break;
        case 'logarithmic': {
            editFunctionImage('f(x)=log_{a}x');
            editChartInputs(['a']);
        }; break;
    }
}

// Rysuje linie z wartościami na obu osiach.
function drawMarksOnCanvas () {
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
        minY: -5,
        maxX: 10,
        maxY: 5,
        unitsPerTick: 1
    });
}

function drawChartOnCanvas() {
    switch(chartType) {
        case 'linear': {
            myGraph.drawEquation(function(x) {
                return 5;
            }, 'green', 3);
        }; break;
        case 'quadratic': {
            myGraph.drawEquation(function(x) {
                return Math.pow(x,2);
            }, 'blue', 3);
        }; break;
        case 'hyperbole': {
            myGraph.drawEquation(function(x) {
                return 1/x;
            }, 'green', 3);
        }; break;
        case 'logarithmic': {
            myGraph.drawEquation(function(x) {
                return calculateLogarithm(10,x);
            }, 'red', 3);
        }
    }
}

// Do obliczania logarytmu z customową podstawą
function calculateLogarithm(base, x) {
	var a = Math.log(x);
    var b = Math.log(base);

    return a / b;
}

function init () {
    drawMarksOnCanvas();

    myGraph.drawEquation(function(x) {
        return 3;
    }, 'orange', 3);

    // Parabola
    myGraph.drawEquation(function(x) {
        return Math.pow(x,2);
    }, 'blue', 3);

    // Hiperbola
    myGraph.drawEquation(function(x) {
        return 1/x;
    }, 'green', 3);

    // Logarytmiczna
    myGraph.drawEquation(function(x) {
        return calculateLogarithm(2,x);
    }, 'red', 3);

    // Wykładnicza
    myGraph.drawEquation(function(x) {
        return Math.pow(2,x);
    }, 'purple', 3);
}


document.addEventListener('DOMContentLoaded', init)