const previousOperationText = document.querySelector("#previousOperation")
const currentOperationText = document.querySelector("#currentOperation")
const buttons = document.querySelectorAll("#buttonsContainer")

class calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""

    }

    // add digit to calculator screen
    addDigit (digit) {
        // check if currente operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // process all calculator operations

    processOperation(operation) {
        //check if currente is empty
        if (this.currentOperationText.innerText === "" && operation !== "C"){
            // change operatrion
            if (this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
                }    
    // get currente and previous value

    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;
    
    switch (operation) {
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous )
            break;
        case "-":
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous )
            break;
        case "/":
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous )
            break;
        case "*":
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous )
            break;
        case "DEL":
            this.processDelOperator();
            break;
        case "CE":
            this.processClearCurrentOperation();
            break;
        case "C":
            this.processClearAll();
            break;
        case "=":
            this.processEqualOperation();
            break;        
        default:
            return;
    }

    }

    // change calues of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ){
        
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current
            }

            // add currente value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    // Change math operation
    changeOperation(operation){

        const mathOperation = ["*", "/", "+", "-"]
        if (!mathOperation.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation;
    
    }
    // delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Clear current operation
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    // Clear operation all

    processClearAll(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";

    }

    processEqualOperation(){
        const operation = previousOperationText.innerText.split(" ")[1]
        
        this.processOperation(operation);
    }

}

const calc = new calculator (previousOperationText, currentOperationText);

buttons.forEach((btn) => {
   btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === "."){
            calc.addDigit(value);
            } else {
                calc.processOperation(value);
            }
        


   });
});

