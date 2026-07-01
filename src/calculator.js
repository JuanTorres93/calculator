import { render } from './display.js';
import { operate } from './operate.js';

import {
  decimal,
  equals as EQUALS_INPUT,
  isOperation,
  isClear,
  isDeleteLastInput,
} from './validOperations.js';

const MAX_INPUT_DIGITS = 15;

let currentValue = '0';
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let hasError = false;
let errorCode = null;

function countDigits(value) {
  return value.replace(/[.-]/g, '').length;
}

export function getCurrentValue() {
  return currentValue;
}

export function isWaitingForSecondNumber() {
  return waitingForSecondNumber;
}

export function hasDecimal() {
  return currentValue.includes('.');
}

export function inputDigit(digit) {
  if (hasError) clear();

  if (waitingForSecondNumber || currentValue === '0') {
    currentValue = digit;
  } else {
    if (countDigits(currentValue) >= MAX_INPUT_DIGITS) return;
    currentValue += digit;
  }

  waitingForSecondNumber = false;
  render(getCalculatorState());
}

export function inputDecimal() {
  if (hasError) clear();

  if (waitingForSecondNumber) {
    currentValue = '0.';
    waitingForSecondNumber = false;
    render(getCalculatorState());
    return;
  }

  if (!hasDecimal()) {
    currentValue += '.';
    render(getCalculatorState());
  }
}

export function backspace() {
  if (hasError) {
    clear();
    return;
  }
  if (waitingForSecondNumber) return;
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
  render(getCalculatorState());
}

export function clear() {
  currentValue = '0';
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
  hasError = false;
  errorCode = null;

  render(getCalculatorState());
}

function evaluatePendingOperation() {
  const secondNumber = parseFloat(currentValue);
  const result = operate(firstNumber, operator, secondNumber);

  if (!Number.isFinite(result)) {
    console.log("Divide by zero error");
    hasError = true;
    errorCode = 'DIVIDE_BY_ZERO';
    return null;
  }

  currentValue = result.toString();
  hasError = false;
  errorCode = null;

  return result;
}

export function chooseOperator(nextOperator) {
  if (hasError) clear();

  if (operator !== null && !waitingForSecondNumber) {
    const result = evaluatePendingOperation();
    firstNumber = result;
  } else {
    firstNumber = parseFloat(currentValue);
  }
  operator = nextOperator;
  waitingForSecondNumber = true;
  render(getCalculatorState());
}

export function equals() {
  if (hasError) {
    clear();
    return;
  }

  if (operator === null || waitingForSecondNumber) return;

  const result = evaluatePendingOperation();

  firstNumber = result;
  operator = null;
  waitingForSecondNumber = true;
  render(getCalculatorState());
}

export function processCalculatorInput(calculatorValueString) {
  if (isDeleteLastInput(calculatorValueString)) return backspace();
  if (isClear(calculatorValueString)) return clear();
  if (calculatorValueString === decimal) return inputDecimal();
  if (calculatorValueString === EQUALS_INPUT) return equals();
  if (isOperation(calculatorValueString))
    return chooseOperator(calculatorValueString);

  return inputDigit(calculatorValueString);
}

export function getCalculatorState() {
  return {
    currentValue,
    firstNumber,
    operator,
    waitingForSecondNumber,
    hasError,
    errorCode,
  };
}
