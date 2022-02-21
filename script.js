class Calculator {
    constructor(displayElement) { 
        this.displayElement = displayElement
        this.clear()
    }    

    appendNumber(number) {
        this.displayContent += number
    }

    appendOperator(operator) {            
        this.displayContent += operator
    }

    replaceOperator(operator) {
        this.displayContent = this.displayContent.slice(0, -1)
        this.appendOperator(operator)
    }

    updateDisplay() {
        this.displayElement.value = this.displayContent
    }

    clear() {
        this.displayContent = ''
        this.displayElement.value = 0
    }

    compute(){
        this.displayContent = ( new Function( "return " + this.displayContent.replace('÷','/').replace('x','*') ) )()
    }
}

const buttons = document.querySelectorAll('button')
const displayElement = document.querySelector('input')
const calculator = new Calculator(displayElement)

let dotCheck = false
let operatorCheck = true
let operatorInput = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.className) {
            case 'operator':
                if( operatorCheck === false ){
                    operatorCheck = true
                    operatorInput = true;
                    calculator.appendOperator(button.innerText)
                } else {
                    if( operatorInput === true ){
                        calculator.replaceOperator(button.innerText)
                    } else {
                        break;
                    }
                }
                calculator.updateDisplay()
                dotCheck = false
                break
            case 'clear':
                calculator.clear()
                dotCheck = false
                operatorCheck = true
                operatorInput = false;
                break
            case 'equal':
                if( operatorCheck == false ){
                    calculator.compute()
                    calculator.updateDisplay()
                } else {
                    break
                }
                break
            case 'dot':
                if( dotCheck === false ){
                    dotCheck = false
                    calculator.appendNumber(button.innerText)
                    calculator.updateDisplay()
                }
                break;
            default:
                calculator.appendNumber(button.innerText)
                calculator.updateDisplay()
                operatorCheck = false
                break
        }
    })      
})