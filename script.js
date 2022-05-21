const error = "ERROR"

const calculator = {
    outputValue: '0',
    firstOperand: null,
    secondOperand: false,
    operator: null,
};

function updateDisplay() {
    const output = document.querySelector('.output');
    output.value = calculator.outputValue;
}

 function inputDigit(digit) {
     const {outputValue, secondOperand} = calculator;
     if(secondOperand === true) {
         calculator.outputValue = digit;
         calculator.secondOperand = false;
     } else {
        if(outputValue === '0') {
         calculator.outputValue = digit;
        } else if(!(calculator.outputValue.length > 11)) {
         calculator.outputValue += digit;
        }
     }
 }

 function inputDecimal(dot) {
     const {outputValue} = calculator;
     if(calculator.secondOperand === true) {
         calculator.outputValue = '0.';
         calculator.secondOperand = false;
         return
     }
     if(!outputValue.includes(dot)) {
         calculator.outputValue += dot;
     }
}

function operationHandler(nextOperator) {
    const {firstOperand, outputValue, operator} = calculator;

    const inputValue = parseFloat(outputValue);
    
    if(operator && calculator.secondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = operate(operator, firstOperand, inputValue);

        if(!result % 1 !== 0 && result.length > 15) {
            
        }
        calculator.outputValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.secondOperand = true;
    calculator.operator = nextOperator;
}

const add = function(num1, num2) {
    let total = 0;
    total = num1 + num2;
    return total;
}
const subtract = function(num1, num2) {
    let total = 0;
    total = num1 - num2;
    return total;
}
const multiply = function(num1, num2) {
    let total = 0;
    total = num1 * num2;
    return total;
}
function divide(num1, num2) {
    if (num2 == 0) {
        num1 = "ERROR"
    }
    else
        return num1 / num2;
}

const operate = function(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
               return divide(num1, num2)
        default:
            return num2;    
    }
}

function resetCalculator() {
    calculator.outputValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = false;
    calculator.operator = null;
    clear.innerHTML = "AC"
}

function toPercentage() {
    const {outputValue} = calculator;
    const newValue = outputValue / 100;
    calculator.outputValue = `${parseFloat(newValue.toFixed(30))}`;
}

function negative() {
    const {outputValue} = calculator;
        const newValue = outputValue * -1;
        calculator.outputValue = newValue;
}


function playAudio(){
    let audio = document.getElementById("audio")
    audio.currentTime = 0.411;
    audio.play()
  }

let clear = document.getElementById("clear")
function changeClear() {
    clear.innerHTML = "C";
}

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (event) => {
    const {target} = event;
    const {value} = target;
    

    if(!target.matches('button')) {
        document.getElementById("audio").play();
        return;
    }
    switch (value) {
        case '+':
        case '-':
        case 'x':
        case '÷':
        case '=':
            operationHandler(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'clear':
            resetCalculator();
            break;
        case '%':
            toPercentage();
            break;
        case '+/-':
            negative();
            break;
        default: 
            if(Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();
});  