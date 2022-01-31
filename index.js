// loop over all inputs and add eventListeners that will toggle a "click" effect.
let inputs = document.querySelectorAll(".input")
inputs.forEach((el) => {
    el.addEventListener("mousedown", () => {
        el.classList.toggle("clicked")
    })
    el.addEventListener("mouseup", () => {
        el.classList.toggle("clicked")
    })
})

// Store buttons in an object for later use.
let buttons = {
    clear: document.getElementById("clear"),
    clearEntry: document.getElementById("clear-entry"),
    percentage: document.getElementById("percentage"),
    division: document.getElementById("division"),
    seven: document.getElementById("seven"),
    eight: document.getElementById("eight"),
    nine: document.getElementById("nine"),
    multiplication: document.getElementById("multiplication"),
    four: document.getElementById("four"),
    five: document.getElementById("five"),
    six: document.getElementById("six"),
    subtraction: document.getElementById("subtraction"),
    one: document.getElementById("one"),
    two: document.getElementById("two"),
    three: document.getElementById("three"),
    addition: document.getElementById("addition"),
    zero: document.getElementById("zero"),
    decimal: document.getElementById("decimal"),
    equals: document.getElementById("equals")
}

let display = document.getElementById("display-digits")
// Create function to set display numbers depending on whether a num-input was pressed yet.
// Also if user attempts to enter second decimal it is removed with slice.
let setDisplay = inp => {
    // If statement prevents user from entering inputs after sum is displayed with equal sign.
    if (previousOperation !== "equal") {
        numInpBool = true
        console.log(numInpBool)
        display.textContent == "0" ? display.textContent = inp.target.textContent : display.textContent += inp.target.textContent
        // If statement to prevent extra decimal points from being placed when there is already one present.
        if (display.textContent.split(".").length - 1 > 1) {
            display.textContent = display.textContent.slice(0, -1)
        }
    }
}

let sum = ""
// Create function to set display to first "num-input" after an operator is selected
let resetAfterOperator = inp => {
    if (document.querySelector(".active") !== null) {
        // let activeOperator = document.querySelector(".active").dataset.operator
        display.textContent = inp.target.textContent
        operators.forEach(el => el.classList.remove("active"))
    }
}

let numInputs = document.querySelectorAll(".num-input")
// Foreach methods to add eventListeners to all num-input buttons.
numInputs.forEach(el => el.addEventListener("click", setDisplay))
numInputs.forEach(el => el.addEventListener("click", resetAfterOperator))


// Add eventListener to "clear button" to set display back to zero.
buttons.clear.addEventListener("click", () => {
    display.textContent !== "0" ? display.textContent = "0" : false
    prevNumber = 0
    operators.forEach(el => el.classList.remove("active"))
    sum = ""
    previousOperation = ""
})

// Add eventListener to "clear-entry" to remove most recent input.
buttons.clearEntry.addEventListener("click", () => {
    display.textContent !== "0" ? display.textContent = display.textContent.slice(0, -1) : false
    display.textContent.length < 1 ? display.textContent = "0" : false
})

// Create function that checks if "active" class is present in DOM.
// If present it removes the present active class and replaces it with target element.
let setActive = inp => {
    document.querySelector(".active") == null ? false : document.querySelector(".active").classList.remove("active")
    inp.target.classList.add("active")
    // If statement to check if prevNumber and display.textContent both exist.
    // If so the calc function is called to evaluate the sum of the operands.
    // Also prevNumber is set to "" to avoid duplicate calls of calc function.
    if (prevNumber && display.textContent) {
        calc(prevNumber, display.textContent)
        prevNumber = ""
    }
    activeOperator = inp.target.dataset.operator
}

let operators = document.querySelectorAll(".operator")
// Foreach method to add eventlistener to all operator buttons
operators.forEach(el => {
    el.addEventListener("click", setActive)
})

let calc = (prevNum, curNum) => {
    if (activeOperator !== null) {
        if (prevNum && display.textContent && boolean == false && numInpBool == true) {
            switch (activeOperator) {
                case "/": console.log("divide")
                    if (sum != "") {
                        sum = (parseFloat(sum) / parseFloat(curNum))
                        display.textContent = sum
                    }
                    sum = (parseFloat(prevNum) / parseFloat(curNum))
                    display.textContent = sum
                    break;
                case "*": console.log("multi")
                    if (sum != "") {
                        sum = (parseFloat(sum) * parseFloat(curNum))
                        display.textContent = sum
                    }
                    sum = (parseFloat(prevNum) * parseFloat(curNum))
                    display.textContent = sum
                    break;
                case "-": console.log("subtract")
                    if (sum != "") {
                        sum = (parseFloat(sum) - parseFloat(curNum))
                        display.textContent = sum
                    }
                    sum = (parseFloat(prevNum) - parseFloat(curNum))
                    display.textContent = sum
                    break;
                case "+":
                    if (sum != "") {
                        sum = (parseFloat(sum) + parseFloat(curNum))
                        display.textContent = sum
                    }
                    sum = (parseFloat(prevNum) + parseFloat(curNum))
                    display.textContent = sum
                    break;
                default:
                    console.log(`sorry we dont have this ${activeOperator}`)
            }
        }
    }
}

// Create boolean that will be "on" if the last input was a number.
// If last input was not a number the boolean is set to false to prevent consecutive operator and equal clicks from creating bug.
let numInpBool = ""
// Create boolean variable to toggle on and off depending on what eventlistener calls it.
// If anything other than equal calls an event listener it will be false to prevent consecutive equal clicks from creating bug.
let boolean = ""
let prevNumber = display.dataset.previousNum
let previousOperation = display.dataset.previousOperation

buttons.equals.addEventListener("click", () => {
    calc(prevNumber, display.textContent)
    numInpBool = false
    boolean = true
    previousOperation = "equal"
})

operators.forEach(el => {
    el.addEventListener("click", () => {
        calc(prevNumber, display.textContent)
        numInpBool = false
        boolean = false
        // Set previous number to current display.textContent so it can be used in future operation
        prevNumber = display.textContent
        previousOperation = "operator"
    })
})

