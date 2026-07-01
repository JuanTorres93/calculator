import {
  addition,
  subtraction,
  multiplication,
  division,
  OPERATOR_SYMBOLS,
} from './validOperations.js';
let display = null;

const MAX_DECIMALS = 2;
const MAX_DISPLAY_DIGITS = 15;

const ERROR_MESSAGES = {
  DIVIDE_BY_ZERO: [
    'Nice try 😏',
    'Math says no.',
    'Zero? Really?',
    "Can't do that.",
    '∞ Not today.',
    'Zero? Nope.',
    '∞ Error',
    "Can't divide by 0.",
  ],
};

function setDisplay(element) {
  if (!(element instanceof HTMLElement)) {
    console.log('Invalid display element.');
    return;
  }

  display = element;
}

function render(state) {
  if (!display) {
    console.log('Display has not been initialized.');
    return;
  }
  if (state.hasError) {
    showError(state.errorCode);
    return;
  }

  const text = buildDisplayText(state);
  updateDisplay(text);
}

function updateDisplay(text) {
  if (!display) {
    console.log('Display has not been initialized.');
    return;
  }

  let newText = text;

  if (newText.length > MAX_DISPLAY_DIGITS) {
    const newTextArray = newText.split('');

    const numberOfExtraDigits = newTextArray.length - MAX_DISPLAY_DIGITS;
    const removedDigits = newTextArray.splice(0, numberOfExtraDigits + 3);

    newText = `...${newTextArray.join('')}`;
  }

  display.textContent = newText;
}

function clearDisplay() {
  updateDisplay('0');
}

function showError(errorCode) {
  const errorMessage = getRandomErrorMessage(errorCode);
  updateDisplay(errorMessage);
}

function buildDisplayText(state) {
  if (state.hasError || state.operator === null) {
    return formatDisplayValue(state.currentValue);
  }

  const operatorSymbol = getOperatorSymbol(state.operator);
  const firstPart = formatDisplayValue(state.firstNumber.toString());
  const currentPart = formatDisplayValue(state.currentValue);

  return state.waitingForSecondNumber
    ? `${firstPart} ${operatorSymbol}`
    : `${firstPart} ${operatorSymbol} ${currentPart}`;
}

function formatDisplayValue(stringValue) {
  if (stringValue === '' || stringValue === null) return '0';

  const hasDecimalPoint = stringValue.includes('.');

  const number = Number(stringValue);

  if (Number.isNaN(number)) return '0';

  const multiplier = 10 ** MAX_DECIMALS;

  const rounded =
    Math.round((number + Number.EPSILON) * multiplier) / multiplier;

  let result = rounded.toString();

  if (hasDecimalPoint && !result.includes('.')) {
    result += '.';
  }

  return result;
}

function getOperatorSymbol(operator) {
  if (!(operator in OPERATOR_SYMBOLS)) {
    console.log(operator);
    return;
  }
  return OPERATOR_SYMBOLS[operator];
}

function getRandomErrorMessage(errorCode) {
  const messages = ERROR_MESSAGES[errorCode];

  if (!messages) {
    console.log(errorCode);
    return;
  }

  const randomIndex = Math.floor(Math.random() * messages.length);

  return messages[randomIndex];
}

export { setDisplay, render, updateDisplay, clearDisplay, showError };
