# Calculator
Calculator example made w/ pure HTML + CSS + JS + JSDoc

## Summary
The code snippet is a JavaScript code that handles the functionality of
a calculator on a webpage.

It includes event handlers for keyboard input and button clicks,
as well as functions to update the display and perform calculations.

## Code Analysis
### Inputs
- Keyboard events triggered by pressing keys on the keyboard.
- Button click events triggered by clicking on calculator buttons.
___
### Flow
1. The code initializes the calculator by getting references to the calculator
element, display element, and key buttons.
2. It adds an event listener for keyboard input to the calculator element,
which triggers the `btnKeyEvent` function.
3. It adds event listeners for button clicks to each key button,
which triggers the `btnCommonEvent` function.
4. When a key is pressed on the keyboard, the `btnKeyEvent` function is called.
5. The `btnKeyEvent` function handles specific key events, such as backspace
and delete keys, and triggers click events on the corresponding button elements.
6. When a button is clicked, the `btnCommonEvent` function is called.
7. Function `btnCommonEvent` updates the display based on the clicked button,
taking into account the current state of the calculator.
8. The code snippet adds event listeners to specific buttons(zero, decimal,
AC, CE, negate), which trigger their respective functions when clicked.
9. The functions update the display and perform calculations based on the
clicked button.
___
### Outputs
- Updates the display element with the entered digits or operations.
- Performs calculations based on the entered digits and operations.
___

https://GitHub.com/GoToLoop/Calculator

https://GoToLoop.GitHub.io/Calculator

https://bpa.st/VKXA
