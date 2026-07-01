import {
  isOperation,
  isClear,
  isDeleteLastInput,
  isEquals,
  OPERATOR_SYMBOLS,
} from './validOperations.js';

export function createCalculatorButton(
  calculatorValueString,
  onClick,
  extraClasses = [],
) {
  const button = document.createElement('button');

  button.classList.add('calculator-button');
  button.setAttribute('id', calculatorValueString);

  button.textContent = isDeleteLastInput(calculatorValueString)
    ? '⌫'
    : OPERATOR_SYMBOLS[calculatorValueString] || calculatorValueString;

  extraClasses.forEach((className) => button.classList.add(className));

  if (isOperation(calculatorValueString))
    button.classList.add('calculator-button--operation');

  if (isClear(calculatorValueString))
    button.classList.add('calculator-button--clear');

  if (isEquals(calculatorValueString))
    button.classList.add('calculator-button--equals');

  button.addEventListener('click', () => {
    onClick(calculatorValueString);
  });

  return button;
}
