// @ts-check

"use strict";

// ========================================================================== \\

var op = '+', entry = 0, result = 0, isShowResult = true;

const KEY = 'keydown', CLICK = 'click', MAX_CHARS = 23;
const ZERO = '0', DOT = '.', NEG = '-', EMPTY = '';

const calc = /** @type {HTMLDivElement} */
  (document.getElementById('calculator'));

const display = /** @type {HTMLSpanElement} */
  (document.getElementById('display'));

/**
 * Resets the state back to entry mode.
 */
function activateEntryState() {
  isShowResult = false;
  result = entry = 0;
}

/**
 * Prepare partial result mode.
 */
function activateResultState() {
  isShowResult = true;
  entry = +display.innerText;
}

// ========================================================================== \\

const keyButtons = /** @type {HTMLCollectionOf<HTMLButtonElement>} */
  (document.getElementsByClassName('key'));

calc.addEventListener(KEY, btnKeyEvent);

/**
 * Handles a 'keydown' event for all .key `button` elements inside #calculator.
 * If a 'key' corresponding to a .key `button`::`textContent` is pressed and
 * it's not a 'repeat', it triggers a 'click' event on that `button`.
 *
 * @param {KeyboardEvent} ev The KeyboardEvent object.
 * Callback uses event object's properties 'key', 'keyCode' and 'repeat'.
 *
 * @description Firstly it checks if backspace key was pressed.
 * If so, it invokes function deleteLastChar() to delete previous char entered.
 * Then it checks if the event is a 'repeat'. If it's so, it returns.
 * Then it checks if Enter or Return key was pressed and calls btnEqualsEvent().
 * After that, it checks if Insert key was pressed and invokes btnNegateEvent().
 * Lastly, it checks if delete key was pressed and invokes btnClearEntryEvent()
 * if that's the case, thus behaving the same as the CE's #ce `button`.
 * If none of the above conditions are met, it iterates over each .key `button`.
 * If the 'key' property of the event matches the `textContent` of current
 * `button`, it triggers a 'click' event on that `button`.
 * It also prematurely `break` the loop after the first match.
 */
function btnKeyEvent({ key, keyCode: k, repeat }) {
  if (k == 8) deleteLastChar(); // key: "Backspace" (ASCII 8)

  else if (repeat) return; // only "Backspace" is allowed to be held down

  else if (k == 10 || k == 13) btnEqualsEvent(); // keys: "Enter" or "Return"

  else if (k == 45) btnNegateEvent(); // key: "Insert" (ASCII 45)

  else if (k == 46) btnClearEntryEvent(); // key: "Delete" (ASCII 46)

  else for (const btn of keyButtons) if (key == btn.textContent) {
    btn.click(); // for the rest, use the key matching .key button's content
    break; // and then stop the checking loop after a match is found
  }
}

/**
 * Deletes the last entered character from the #display `span` element.
 *
 * @description If `isShowResult` state is currently set `true` it does nothing.
 * If the #display text length is more than 1, it removes last char from it.
 * Othewise it changes it back to initial value '0'.
 * If final #display is a form of negative zero, sanitize it to just zero "0".
 */
function deleteLastChar() {
  if (isShowResult) return;

  const { innerText } = display, { length } = innerText;

  const s = display.textContent = length > 1 && innerText.slice(0, -1) || ZERO;

  if (s == NEG || s == '-0' || s == '-0.') display.textContent = ZERO;
}

// ========================================================================== \\

const commonButtons = /** @type {HTMLCollectionOf<HTMLButtonElement>} */
  (document.getElementsByClassName('common'));

for (const btn of commonButtons) btn.addEventListener(CLICK, btnCommonEvent);

/**
 * Handles the 'click' event of a .common `button` element. It appends the text
 * of the clicked button to the #display `span` element on the webpage.
 *
 * @this {HTMLButtonElement} `button` .common
 *
 * @description The function checks if `isShowResult` is true. If it is, it sets
 * `isShowResult` to false and sets the text content of the #display `span`
 * element to the text content of the clicked button.
 * If `isShowResult` is false, the function checks if the length of the text
 * content in the #display `span` element is 1 and if the 1st character is '0'.
 * If both conditions are true, it sets the text content of the #display `span`
 * element to the text content of the clicked button.
 * If none of the above conditions are met, it appends the text content of the
 * clicked button to the existing text content in the #display `span` element.
 */
function btnCommonEvent() {
  const { innerText: { 0: head, length: len } } = display, { innerText } = this;

  if (isShowResult) {
    activateEntryState();
    display.textContent = innerText;
  }

  else if (len == 1 && head == ZERO) display.textContent = innerText;

  else if (len < MAX_CHARS) display.innerText += innerText;
}

// ========================================================================== \\

document.getElementById('zero')?.addEventListener(CLICK, btnZeroEvent);

/**
 * Handles the 'click' event of the .digit #zero `button` element.
 *
 * @description If the variable `isShowResult` is true, it sets it to false
 * and updates the text content of the #display `span` element to a zero ('0').
 * If `isShowResult` is false, it checks if the length of the display text is
 * greater than 1 or if the first character of the display text is not '0'.
 * If either condition is true, append '0' to the display text.
 */
function btnZeroEvent() {
  if (isShowResult) {
    activateEntryState();
    display.textContent = ZERO;
    return;
  }

  const { innerText: { 0: head, length: len } } = display;

  if (len < MAX_CHARS && (len > 1 || head != ZERO)) display.innerText += ZERO;
}

// ========================================================================== \\

document.getElementById('decimal')?.addEventListener(CLICK, btnDotEvent);

/**
 * Handles the 'click' event of the .digit #decimal `button` element.
 *
 * @description If the variable `isShowResult` is true, it sets it to false and
 * updates the text content of the #display `span` element to a zero dot ('0.').
 * If `isShowResult` is false and the #display `span` element does not already
 * contain a dot, the function appends a dot to the existing text content
 * of the #display `span` element.
 */
function btnDotEvent() {
  if (isShowResult) {
    activateEntryState();
    display.textContent = '0.';
    return;
  }

  const { innerText } = display, { length } = innerText;

  if (length < MAX_CHARS && !innerText.includes(DOT)) display.innerText += DOT;
}

// ========================================================================== \\

document.getElementById('ac')?.addEventListener(CLICK, btnAllClearEvent);

/**
 * Handles the 'click' event of the C's #ac `button` element. It resets the
 * #calculator back to its initial state.
 *
 * @description This function is triggered when the C's #ac `button` is clicked.
 * It resets the #calculator to its initial state by setting the operation to
 * addition '+', the result to 0, and `isShowResult` to true.
 * It also sets the text content of the #display `span` element back to '0'.
 */
function btnAllClearEvent() {
  activateEntryState();
  op = '+';
  display.textContent = ZERO;
}

document.getElementById('ce')?.addEventListener(CLICK, btnClearEntryEvent);

/**
 * Handles the 'click' event of the CE's #ce `button` element.
 * It clears the last entry on the #calculator.
 *
 * @description It checks if current operator `op` is "=". If it is it calls
 * `btnAllClearEvent()`, effectively behaving as the C's #ac `button`.
 * Otherwise, it sets the `textContent` of the #display element back to '0',
 * clearing the last entry on the #calculator.
 */
function btnClearEntryEvent() {
  if (op == '=') btnAllClearEvent();
  else display.textContent = ZERO;
}

// ========================================================================== \\

document.getElementById('negate')?.addEventListener(CLICK, btnNegateEvent);

/**
 * Handles the 'click' event of the #negate `button` element.
 * It negates the current value on the #calculator's #display.
 *
 * @description This callback triggers when #negate `button` is clicked.
 * If the current display value is '0' or '0.', it does nothing.
 * If `isShowResult` is true, it multiplies the result by -1.
 * Then it checks if current #display value is negative. If it is, it removes
 * the negative sign. If it isn't, it adds a '-' sign in front of the current
 * display value.
 */
function btnNegateEvent() {
  const { innerText } = display, [ head ] = innerText;

  if (innerText == ZERO || innerText == '0.') return;

  if (isShowResult) result *= -1;

  display.textContent = head == NEG && innerText.substr(1) || NEG + innerText;
}

// ========================================================================== \\

document.getElementById('sqrt')?.addEventListener(CLICK, btnSqrtEvent);

/**
 * Handles the 'click' event of the #sqrt `button` element.
 * Calculates square root of the current value on the #calculator's #display.
 *
 * @description This callback triggers when #sqrt `button` is clicked.
 * If `isShowResult` is true, it calculates the square root of the result.
 * Then it calculates and displays the square root of the current display value.
 */
function btnSqrtEvent() {
  if (isShowResult) result = Math.sqrt(result) || 0;
  display.textContent = (Math.sqrt(+display.innerText) || 0) + EMPTY;
}

// ========================================================================== \\

document.getElementById('percent')?.addEventListener(CLICK, btnPercentEvent);

/**
 * Handles the 'click' event of the #percent `button` element.
 * Calculates percentage (%) of the current value on the #calculator's #display
 * relative to the result.
 *
 * @description This callback triggers when #percent `button` is clicked.
 * If `isShowResult` is true, it does nothing.
 * Otherwise, it calculates and displays the percentage of the current display
 * value relative to the result.
 */
function btnPercentEvent() {
  if (isShowResult) return;
  display.textContent = +display.innerText * result / 100 + EMPTY;
}

// ========================================================================== \\

document.getElementById('reciprocal')?.addEventListener(CLICK, btnInverseEvent);

/**
 * Handles the 'click' event of the #reciprocal `button` element.
 * Calculates reciprocal (1/x) of current value on the #calculator's #display.
 *
 * @description This callback triggers when #reciprocal `button` is clicked.
 * If `isShowResult` is true, it calculates the reciprocal of the result.
 * Then it calculates and displays the reciprocal of the current display value.
 */
function btnInverseEvent() {
  var r = 0;

  if (isShowResult) result = isFinite(r = 1 / result) ? r : 0;

  display.textContent = (isFinite(r = 1 / +display.innerText) ? r : 0) + EMPTY;
}

// ========================================================================== \\

document.getElementById('equals')?.addEventListener(CLICK, btnEqualsEvent);

function btnEqualsEvent() {

}

// ========================================================================== \\
