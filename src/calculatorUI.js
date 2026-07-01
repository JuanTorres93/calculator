import { createCalculatorButton } from './calculatorButton.js';
import { processCalculatorInput } from './calculator.js';
import { setDisplay } from './display.js';
import {
  addition,
  clear,
  decimal,
  deleteLastInput,
  division,
  equals,
  mapToValidInput,
  multiplication,
  subtraction,
} from './validOperations.js';

export function createCalculatorUI() {
  const calculatorContainer = document.createElement('article');
  const displayContainer = document.createElement('div');
  const buttonsContainer = document.createElement('div');

  calculatorContainer.classList.add('calculator');
  buttonsContainer.classList.add('calculator__buttons-container');
  displayContainer.classList.add('calculator__display');

  calculatorContainer.appendChild(displayContainer);
  calculatorContainer.appendChild(buttonsContainer);
  calculatorContainer.appendChild(createInstructions());

  // Display

  const display = document.createElement('span');
  setDisplay(display);

  display.textContent = '0';

  displayContainer.appendChild(display);

  // Buttons

  buttonsContainer.appendChild(
    createCalculatorButton(clear, processCalculatorInput),
  );
  buttonsContainer.appendChild(
    createCalculatorButton(deleteLastInput, processCalculatorInput, [
      'span-2-columns',
    ]),
  );
  buttonsContainer.appendChild(
    createCalculatorButton(division, processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('7', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('8', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('9', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton(multiplication, processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('4', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('5', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('6', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton(subtraction, processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('1', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('2', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('3', processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton(addition, processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton('0', processCalculatorInput, ['span-2-columns']),
  );

  buttonsContainer.appendChild(
    createCalculatorButton(decimal, processCalculatorInput),
  );

  buttonsContainer.appendChild(
    createCalculatorButton(equals, processCalculatorInput),
  );

  return calculatorContainer;
}

const INSTRUCTIONS_ROWS = [
  [
    ['AC', 'Clears everything'],
    ['⌫', 'Deletes the last digit'],
    ['0-9', 'Digits'],
  ],
  [
    ['+ - * /', 'Operators'],
    ['Enter', 'Equals'],
    ['Backspace', 'Deletes the last digit'],
  ],
  [
    ['C', 'Clears everything'],
    ['.', 'Decimal point'],
    ['Note', '2 decimals shown'],
  ],
];

function createInstructions() {
  const table = document.createElement('table');
  table.classList.add('calculator__instructions');
  const tbody = document.createElement('tbody');

  INSTRUCTIONS_ROWS.forEach((row) => {
    const tr = document.createElement('tr');

    row.forEach(([key, description]) => {
      const td = document.createElement('td');

      const strong = document.createElement('strong');
      strong.textContent = key;

      td.appendChild(strong);
      td.appendChild(document.createTextNode(` ${description}`));

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  return table;
}
