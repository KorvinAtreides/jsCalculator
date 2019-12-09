const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
alert ("кнопки корня, факториала и тригонометрических функций не требуют второго операнда; "+
"для выполнения нужно нажать равно или другую кнопку математического действия")
alert ("точность корня, деления и тригонометрических функций составляет 7 знаков; "+
"точность сложения, вычитания и умножения определяется кол-вом значащих цифр")
var val = select1.value ;
document.getElementById('select1').addEventListener('change', function() {
  val = this.value;
});
var first;

//All Operators
const allCalculation = {
  '+': (firstOperand, secondOperand) => Math.round((firstOperand + secondOperand)*Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)))/Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)),

  '-': (firstOperand, secondOperand) => Math.round((firstOperand - secondOperand)*Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)))/Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)),

  '=': (firstOperand, secondOperand) => secondOperand,

  '*': (firstOperand, secondOperand) => Math.round((firstOperand * secondOperand)*Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)))/Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)),
  '/': (firstOperand, secondOperand) => Math.round((firstOperand / secondOperand)*10000000)/10000000,
  '%': (firstOperand, secondOperand) => Math.round((firstOperand % secondOperand)*Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)))/Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)),
  'x^y': (firstOperand, secondOperand) => Math.round((Math.pow(firstOperand, secondOperand))*Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)))/Math.pow(10,Math.max(String(firstOperand).length,String(secondOperand).length)),
  'sin': (firstOperand, secondOperand) => Math.round(Math.sin(firstOperand*Number(val))*10000000)/10000000,
  'cos': (firstOperand, secondOperand) => Math.round(Math.cos(firstOperand*Number(val))*10000000)/10000000,
  'tg': (firstOperand, secondOperand) => Math.round(Math.tan(firstOperand*Number(val))*10000000)/10000000,
  'ctg': (firstOperand, secondOperand) => Math.round(1 / Math.tan(firstOperand*Number(val))*10000000)/10000000,
  'sqrt': (firstOperand, secondOperand) => Math.round(Math.sqrt(firstOperand)*10000000)/10000000,
  'n!': (firstOperand, secondOperand) => factorial(firstOperand)
}; 
function factorial(n) {
  if (n==0) { return 1;  }
  if (n>0) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  } else {return NaN}
}

function inputOperand(ourOperand) {
  const {
      displayValue,
      waitingForSecondOperand
  } = calculator;

  if (waitingForSecondOperand === true) {
      calculator.displayValue = ourOperand;
      calculator.waitingForSecondOperand = false;
  } else {
      calculator.displayValue = displayValue === '0' ? ourOperand : displayValue + ourOperand;
  }

  console.log(calculator);
}

function truncated(num, decimalPlaces) {    
  let numPowerConverter = Math.pow(10, decimalPlaces); 
  return ~~(num * numPowerConverter)/numPowerConverter;
}

function handleOperator(nextOperator) {
  const {
      firstOperand,
      displayValue,
      operator
  } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      if (first == true){calculator.waitingForSecondOperand = false;}
      console.log(calculator);
      return;
  }

  if (firstOperand == null) {
      calculator.firstOperand = inputValue;
  } else if (operator) {
      const currentValue = firstOperand || 0;
      if (operator == '/' && inputValue == 0) {
        const result = NaN;
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        alert('Error: деление на 0'); 
      } else if(operator == 'x^y' && inputValue == 0 && currentValue == 0){
        const result = NaN;
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        alert('Error: неопределённость вида 0 в степени 0'); 
      }
      else{const result = allCalculation[operator](currentValue, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;}
  }
  calculator.waitingForSecondOperand = true;
  if (first == true){calculator.waitingForSecondOperand = false;}
  calculator.operator = nextOperator;
  console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector('.calc_all');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calc_keys');
keys.addEventListener('click', (event) => {
  const {
      target
  } = event;
  if (!target.matches('button')) {
      return;
  }

  if (target.classList.contains('operator')) {
      if (target.classList.contains('trig')){first = true } else{first = false}
      handleOperator(target.value);
      updateDisplay();
      return;
  }
  if (target.classList.contains('clear')) {
     calculator.displayValue = '0';
      calculator.firstOperand= null;
      calculator.waitingForSecondOperand= false;
      calculator.operator= null;
  }
  inputOperand(target.value);
  updateDisplay();
}); 