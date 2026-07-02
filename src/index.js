import { processCalculatorInput } from './calculator.js';
import { createCalculatorUI } from './calculatorUI.js';
import { mapToValidInput } from './validOperations.js';

document.addEventListener('keydown', handleKeyboardInput);

const mainBody = document.querySelector('#body');

const calculatorUI = createCalculatorUI();

mainBody.appendChild(calculatorUI);

function handleKeyboardInput(event) {
  const key = event.key;

  // Space has no calculator action, but browsers natively re-trigger a
  // click on whichever button still has keyboard focus, causing it to
  // repeat the last digit (or hit '8' if that's the default focus target).
  if (key === ' ') {
    event.preventDefault();
    return;
  }

  const validInput = mapToValidInput(key);

  if (!validInput) return;

  event.preventDefault();

  showButtonFeedback(validInput);
  processCalculatorInput(validInput);
}

function showButtonFeedback(buttonId) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  button.classList.add('is-keyboard-pressed');

  setTimeout(() => {
    button.classList.remove('is-keyboard-pressed');
  }, 150);
}
