import { processCalculatorInput } from './calculator.js';
import { createCalculatorUI } from './calculatorUI.js';
import { mapToValidInput } from './validOperations.js';

document.addEventListener('keydown', handleKeyboardInput);

const mainBody = document.querySelector('#body');

const calculatorUI = createCalculatorUI();

mainBody.appendChild(calculatorUI);

function handleKeyboardInput(event) {
  const key = event.key;

  const validInput = mapToValidInput(key);

  if (!validInput) return;

  // Prevents native browser side effects, e.g. '/' opening the quick-find
  // menu, or Enter re-triggering a click on whichever button still has
  // keyboard focus from a previous mouse click.
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
