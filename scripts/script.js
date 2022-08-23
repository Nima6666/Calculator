class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand
        this.currentOperand = currentOperand
        this.clear()
    }

    clear() {
        this.prevNum = ''
        this.curNum = ''
        this.operator = undefined
    }

    delete() {
        this.curNum = (this.curNum).toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.curNum.includes('.')) return
        this.curNum = this.curNum.toString() + number.toString()
    }

    chooseOperator(operator) {
        if (this.curNum === '') return
        if (this.prevNum !== '') {
            this.compute()
        }
        this.operator = operator
        this.prevNum = this.curNum
        this.curNum = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevNum)
        const curr = parseFloat(this.curNum)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operator) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.curNum = computation
        this.operator = undefined
        this.prevNum = ''
    }

    updateDisplay() {
        this.currentOperand.textContent = this.curNum
        this.previousOperand.textContent = this.prevNum + (this.operator ? this.operator : '')
    }

}



const previousOperand = document.querySelector('.previous-operand')
const currentOperand = document.querySelector('.current-operand')
const numbers = document.querySelectorAll('[data-num]')
const operators = document.querySelectorAll('[data-operator]')
const allClear = document.querySelector('[data-all-clear]')
const del = document.querySelector('[data-del]')
const equals = document.querySelector('[data-equals]')

const calculator = new Calculator(previousOperand, currentOperand)

numbers.forEach(number => number.addEventListener('click', () => {
    calculator.appendNumber(number.textContent)
    calculator.updateDisplay()
}))

operators.forEach(operator => operator.addEventListener('click', () => {
    calculator.chooseOperator(operator.textContent)
    calculator.updateDisplay()
}))

allClear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

del.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})