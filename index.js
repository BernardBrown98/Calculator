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
    display.textContent == "0" ? display.textContent = inp.target.textContent : display.textContent += inp.target.textContent
    if (display.textContent.split(".").length - 1 > 1) {
        display.textContent = display.textContent.slice(0, -1)
    }
}
let sum = 0
// Create function to set display to first "num-input" after an operator is selected
let resetAfterOperator = inp => {
    if (document.querySelector(".active") !== null) {
        let activeOperator = document.querySelector(".active").dataset.operator
        console.log(activeOperator)
        display.textContent = inp.target.textContent
        operators.forEach(el => el.classList.remove("active"))
        switch (activeOperator) {
            case "/": console.log("divide")
                break;
            case "*": console.log("multi")
                break;
            case "-": console.log("subtract")
                break;
            case "+":
                console.log(parseFloat(prevNum) + parseFloat(display.textContent))
                sum = (parseFloat(prevNum) + parseFloat(display.textContent))
                break;
            default:
                console.log(`sorry we dont have this ${activeOperator}`)
        }
    }
}

let numInputs = document.querySelectorAll(".num-input")
// Foreach methods to add eventListeners to all num-input buttons.
numInputs.forEach(el => el.addEventListener("click", setDisplay))
numInputs.forEach(el => el.addEventListener("click", resetAfterOperator))


// Add eventListener to "clear button" to set display back to zero.
buttons.clear.addEventListener("click", () => {
    display.textContent !== "0" ? display.textContent = "0" : false
    prevNum = 0
    operators.forEach(el => el.classList.remove("active"))
    sum = 0


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
}
let operators = document.querySelectorAll(".operator")
// Foreach method to add eventlistener to all operator buttons
operators.forEach(el => el.addEventListener("click", setActive))


let prevNum = display.dataset.previousNum
let setPrevNum = () => {
    let count = 0;
    console.log(count)
    if (count == 0) {
        prevNum = display.textContent
        console.log(prevNum)
        count++
        console.log(count)
    }
    display.textContent = sum

}

// let calc = (prevNum, activeOperator, curNum) => {
//     prevNum activeOperator curNum
// }

// buttons.equals.addEventListener("click", calc)
buttons.addition.addEventListener("click", setPrevNum)


