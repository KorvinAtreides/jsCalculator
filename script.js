const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

var first; //for trig functions

//All Operators
const allCalculation = {
  "+": (firstOperand, secondOperand) =>
    truncated(
      firstOperand + secondOperand,
      Math.max(digitsCount(firstOperand), digitsCount(secondOperand))
    ),

  "-": (firstOperand, secondOperand) =>
    truncated(
      firstOperand - secondOperand,
      Math.max(digitsCount(firstOperand), digitsCount(secondOperand))
    ),

  "=": (firstOperand, secondOperand) => secondOperand,

  "*": (firstOperand, secondOperand) =>
    truncated(
      firstOperand * secondOperand,
      Math.max(digitsCount(firstOperand), digitsCount(secondOperand))
    ),
  "/": (firstOperand, secondOperand) => truncated(firstOperand / secondOperand),
  "^": (firstOperand, secondOperand) =>
    truncated(
      Math.pow(firstOperand, secondOperand),
      Math.max(digitsCount(firstOperand), digitsCount(secondOperand))
    ),
  sin: (firstOperand, secondOperand) =>
    truncated(Math.sin(firstOperand * Number(select1.value))),
  cos: (firstOperand, secondOperand) =>
    truncated(Math.cos(firstOperand * Number(select1.value))),
  tg: (firstOperand, secondOperand) =>
    truncated(Math.tan(firstOperand * Number(select1.value))),
  ctg: (firstOperand, secondOperand) =>
    truncated(1 / Math.tan(firstOperand * Number(select1.value))),
  sqrt: (firstOperand, secondOperand) => truncated(Math.sqrt(firstOperand)),
  "n!": (firstOperand, secondOperand) => factorial(firstOperand),
};

function factorial(n) {
  if (n > 1000) {
    return Infinity;
  }
  if (n == 0) {
    return 1;
  }
  if (n > 0) {
    return n != 1 ? n * factorial(n - 1) : 1;
  } else {
    return NaN;
  }
}

function inputOperand(ourOperand) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    //ввод второго числа
    calculator.displayValue = ourOperand;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? ourOperand : displayValue + ourOperand; //всё ещё вводится первое число
  }
  //console.log(calculator);
}

function truncated(num, decimalPlaces = 7) {
  //округление - умножаем на 10 в степени кол-ва значащих цифр или 7
  let numPowerConverter = Math.pow(10, decimalPlaces); //Math.round округляет до ближайшего целого
  return Math.round(num * numPowerConverter) / numPowerConverter; //делим обратно
}

function digitsCount(str) {
  let pointPos = String(str).indexOf(".");
  if (pointPos == -1) {
    return 0;
  } else {
    return String(str).length - pointPos - 1;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    if (first == true) {
      calculator.waitingForSecondOperand = false;
    }
    //console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    if (operator == "/" && inputValue == 0) {
      const result = Infinity;
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
      ulOfOperations.innerHTML += `<li>Error: Division by 0</li>`;
    } else if (operator == "^" && inputValue == 0 && currentValue == 0) {
      const result = NaN;
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
      dulOfOperations.innerHTML += `<li>Error: Indetermination </li>`;
    } else {
      const result = allCalculation[operator](currentValue, inputValue);
      if (!calculator.waitingForSecondOperand && operator != "=") {
        historyAdd(currentValue, operator, inputValue, String(result));
      }
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  }
  calculator.waitingForSecondOperand = true;
  if (first == true) {
    calculator.waitingForSecondOperand = false;
  }
  calculator.operator = nextOperator;
  //console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector(".calc_all");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calc_keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    if (target.classList.contains("trig")) {
      first = true;
    } else {
      first = false;
    }
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("clear")) {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    document.getElementById("ulOfOperations").innerHTML += `<li>Reset</li>`;
  }
  inputOperand(target.value);
  updateDisplay();
});

function notesChevron(open) {
  let titleWithChevrons = document.getElementsByClassName("title");
  for (let titleWithChevron of titleWithChevrons) {
    titleWithChevron.addEventListener("click", function () {
      if (!open) {
        titleWithChevron.firstElementChild.innerHTML = "";
        titleWithChevron.firstElementChild.innerHTML = `<i class="fas fa-chevron-up"></i>`;
        titleWithChevron.nextElementSibling.style.display = "block";
        titleWithChevron.style.borderBottom = "3px double darkblue";
        open = 1;
      } else {
        titleWithChevron.firstElementChild.innerHTML = "";
        titleWithChevron.firstElementChild.innerHTML = `<i class="fas fa-chevron-down"></i>`;
        titleWithChevron.nextElementSibling.style.display = "none";
        titleWithChevron.style.borderBottom = "none";
        open = 0;
      }
    });
  }
}
notesChevron(1);

function notesLang() {
  let notesLangx = document.getElementsByClassName("notesLanguage")[0];
  for (let notesLang1 of notesLangx.children) {
    notesLang1.addEventListener("click", function () {
      for (let others of notesLangx.children) {
        others.style.backgroundColor = "transparent";
      }
      notesLang1.style.backgroundColor = "cornflowerblue";
      if (notesLang1.className == "rus") {
        notesLangx.nextElementSibling.innerHTML = "";
        notesLangx.nextElementSibling.innerHTML = `
          <p>1) Кнопки квадратного корня, факториала и тригонометрических функций не требуют второго операнда. 
          Для выполнения нужно нажать равно или другую кнопку математического действия.</p>
          <p>2) Точность квадратного корня, деления и тригонометрических функций составляет 7 знаков. 
          Точность сложения, вычитания и умножения определяется кол-вом значащих цифр.</p>`;
      } else {
        notesLangx.nextElementSibling.innerHTML = "";
        notesLangx.nextElementSibling.innerHTML = `
          <p>1)The  square root, factorial and trigonometric buttons do not require a second operand.
          To execute, you need to press button "=" or another button of the mathematical action.</p>        
          <p>2)The precision of the square root, division and trigonometric functions is 7 digits.
          The precision of addition, subtraction and multiplication is determined by the number of significant digits.</p>`;
      }
    });
  }
}
notesLang();

function historyAdd(currentValue1, operator1, inputValue1, result1) {
  let ul = document.getElementById("ulOfOperations");
  if (operator1 == "n!") {
    operator1 = "!";
    ul.innerHTML +=
      `<li>` + currentValue1 + operator1 + ` = ` + result1 + `</li>`;
  } else if (
    operator1 == "sin" ||
    operator1 == "cos" ||
    operator1 == "tg" ||
    operator1 == "ctg"
  ) {
    if (select1.value == 1) {
      ul.innerHTML += `<li>${operator1}(${currentValue1}) = ${result1}</li>`;
    } else {
      ul.innerHTML += `<li>${operator1}(${currentValue1}&#176) = ${result1}</li>`;
    }
  } else if (operator1 == "sqrt") {
    operator1 = "&#8730";
    ul.innerHTML += `<li>${operator1}(${currentValue1}) = ${result1}</li>`;
  } else {
    ul.innerHTML += `<li>${currentValue1} ${operator1} ${inputValue1} = ${result1}</li>`;
  }
}
