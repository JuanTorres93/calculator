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

const BASE_FONT_SIZE_REM = 5;
const MIN_FONT_SIZE_REM = 1.5;
const FONT_SIZE_STEP_REM = 0.1;

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

  display.textContent = text;
  fitDisplayFontSize();
}

function fitDisplayFontSize() {
  const container = display.parentElement;
  if (!container) return;

  display.style.fontSize = `${BASE_FONT_SIZE_REM}rem`;

  const containerStyle = getComputedStyle(container);
  const availableWidth =
    container.clientWidth -
    parseFloat(containerStyle.paddingLeft) -
    parseFloat(containerStyle.paddingRight);

  let fontSize = BASE_FONT_SIZE_REM;

  while (
    display.scrollWidth > availableWidth &&
    fontSize > MIN_FONT_SIZE_REM
  ) {
    fontSize = Math.max(MIN_FONT_SIZE_REM, fontSize - FONT_SIZE_STEP_REM);
    display.style.fontSize = `${fontSize}rem`;
  }
}

function limitDigits(text) {
  const digitCount = text.replace('.', '').length;
  if (digitCount <= MAX_DISPLAY_DIGITS) return text;

  const textArray = text.split('');
  const numberOfExtraDigits = digitCount - MAX_DISPLAY_DIGITS;
  textArray.splice(0, numberOfExtraDigits + 3);

  return `...${textArray.join('')}`;
}

function clearDisplay() {
  updateDisplay('0');
}

function showError(errorCode) {
  const errorMessage = getRandomErrorMessage(errorCode);
  updateDisplay(errorMessage);
}

function buildDisplayText(state) {
  if (state.hasError) {
    return formatDisplayValue(state.currentValue);
  }

  if (state.operator === null) {
    const isResult = state.waitingForSecondNumber;

    return isResult
      ? formatResultValue(state.currentValue)
      : limitDigits(formatDisplayValue(state.currentValue));
  }

  const operatorSymbol = getOperatorSymbol(state.operator);
  const firstPart = limitDigits(
    formatDisplayValue(state.firstNumber.toString()),
  );
  const currentPart = limitDigits(formatDisplayValue(state.currentValue));

  return state.waitingForSecondNumber
    ? `${firstPart} ${operatorSymbol}`
    : `${firstPart} ${operatorSymbol} ${currentPart}`;
}

function formatResultValue(stringValue) {
  const number = Number(stringValue);

  if (Number.isNaN(number)) return '0';

  const integerDigitCount = Math.trunc(Math.abs(number)).toString().length;

  if (integerDigitCount > MAX_DISPLAY_DIGITS) {
    return number.toExponential(MAX_DECIMALS);
  }

  return formatDisplayValue(stringValue);
}

function formatDisplayValue(stringValue) {
  if (stringValue === '' || stringValue === null) return '0';

  const hasDecimalPoint = stringValue.includes('.');

  const number = Number(stringValue);

  if (Number.isNaN(number)) return '0';

  if (!hasDecimalPoint) return number.toString();

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
