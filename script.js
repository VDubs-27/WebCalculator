const screen = document.getElementById("screen");
const screenText = document.getElementById("screen-text");
const cells = document.querySelectorAll(".cell");
const nums = document.querySelectorAll("#num");
const ops = document.querySelectorAll("#operators");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");
const decimal = document.getElementById("num-decimal");
let opArray = [];
let ans = "";
let operator = null;
let num1 = "";
let num2 = "";
let tempAns = "";

// Initialises screen output.
screenText.innerText = "🤓";

// Performs operations.
function operate(opArray) {

    // Delegates input array into two different numbers, and an operator.
    for (let i = 0; i < opArray.length; i++) {

        if (opArray[i] == ".") {
            if (!operator) {
                num1 += opArray[i];
            } else if (operator) {
                num2 += opArray[i];
            }
            continue;
        }

        else if (isNaN(opArray[i]) && !isNaN(opArray[0])) {
            operator = opArray[i];
            continue;
        }

        else if (operator) {
            num2 += opArray[i];
        }

        else if (!operator) {
            num1 += opArray[i];
        }
    }

    // Performs operations.
    if (operator == "+") {
        ans = parseFloat(num1) + parseFloat(num2);
        console.log(3+.5);
    }
    else if (operator == "-") {
        ans = num1 - num2;
    }
    else if (operator == "*") {
        ans = num1 * num2;
    }
    else if (operator == "/") {
        ans = num1 / num2;
    }
    else {
        ans = num1;
    }

    // Setting new value for answer, reset constants.
    console.log(operator);
    console.log(num1);
    console.log(num2);
    ans = parseFloat(ans);
    tempAns = parseFloat(ans.toFixed(5));
    console.log(ans);
    num1 = "";
    num2 = "";

    // Manages inputs without operators, decimals, and rounding.
    if (!operator || !ans.toString().includes(".")) {
        screenText.innerText = ans;
    }
    else {
        screenText.innerText = parseFloat(ans.toFixed(5));
    }

    // Addresses invalid outputs.
    if (screenText.innerText === "NaN" || screenText.innerText === "Infinity") {
        alert("Error");
        location.reload();
    }
    else if (ans < 0) {
        screenText.innerText = tempAns;
    }

    // Updates title of the screen.
    screen.title = screenText.innerText;
    screenText.style.right = "auto";
    screen.style.border = "1px solid #139df2";
}

// Addresses actions for buttons on click.
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        // Setting styling for interactive actions.
        screen.style.border = "1px solid black";
        screenText.style.right = "0";

        // Removes any negative number errors.
        if (screenText.innerText == tempAns && tempAns < 0 && !cell.id.includes("equal")) {
            screenText.innerText = "";
            clear.click();
        }

        // Removes placeholder text.
        if (screenText.innerText === "🤓") {
            screenText.innerText = "";
        }

        console.log(cell.innerText);

        // Conditions for different buttons pressed, num, decimal, and operators appended to array.
        if (cell.id.includes("num")) {
            if (cell.id.includes("decimal")) {
                opArray += ".";
            }
            else {
                opArray += parseInt(cell.innerText);
            }
        }
        else if (cell.id.includes("operator")) {
            if (screenText.innerText.includes("+") || screenText.innerText.includes("−") || screenText.innerText.includes("-") || screenText.innerText.includes("÷") || screenText.innerText.includes("×")) {
                alert("Only one operation per calculation!");
                return;
            }
            console.log(screenText.innerText);
            opArray += cell.dataset.alt;
        }

        // Editing screen hover text, appending screen text on button press.
        screenText.innerText += cell.innerText;
        console.log("array = " + opArray);
        screen.title = screenText.innerText;
    });
});

// Clear button functionality.
clear.addEventListener("click", () => {
    screenText.innerText = "🤓";
    opArray = [];
});

// Equal/enter button functionality.
equal.addEventListener("click", () => {
    screenText.innerText = "";
    operate(opArray);
    opArray = [ans];
    ans = false;
    operator = null;
});

// Decimal button functionality.
decimal.addEventListener("click", () => {
    if (screenText.innerText === ".") {
        screenText.innerText = "0.";
        opArray = ["0."];
    }
});

// Incorporates keyboard typing into calculator.
document.addEventListener("keydown", (event) => {
    cells.forEach((cell) => {
        key = event.key;

        if (event.key === cell.innerText || event.key === cell.dataset.alt) {
            cell.click();
        }
    });

    if (key === "Enter") {
        equal.click();
    }
    else if (key === "c" || key === "C") {
        clear.click();
    }
    else if (key === "Backspace" || key === "Delete") {
        opArray = opArray.slice(0,-1);
        screenText.innerText = screenText.innerText.slice(0, -1);
    }
});