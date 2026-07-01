export const addition = '+';
export const subtraction = '-';
export const multiplication = 'x';
export const division = '/';

export const clear = 'AC';
export const deleteLastInput = 'delete-last-input';

export const equals = '=';
export const decimal = '.';

const validOperations = [addition, subtraction, multiplication, division];

const numberInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const validCalculatorInputs = [
  ...validOperations,
  ...numberInputs,
  clear,
  deleteLastInput,
  decimal,
  equals,
];

export const OPERATOR_SYMBOLS = {
  [addition]: '+',
  [subtraction]: '-',
  [multiplication]: '×',
  [division]: '÷',
};

export function mapToValidInput(value) {
  if (validCalculatorInputs.includes(value)) return value;

  if (value === '*') return multiplication;
  if (value === 'Enter') return equals;
  if (value === 'Backspace') return deleteLastInput;
  if (value === 'Delete') return deleteLastInput;
  if (value === 'c') return clear;
  if (value === 'a') return clear;

  return null;
}

export function isOperation(value) {
  return validOperations.includes(value);
}

export function isClear(value) {
  return value === clear;
}

export function isDeleteLastInput(value) {
  return value === deleteLastInput;
}

export function isEquals(value) {
  return value === equals;
}
