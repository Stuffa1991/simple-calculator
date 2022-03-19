import { Component, Inject } from '@angular/core';

type operand = "/" | "*" | "*" | "-" | "+" | null
type allowedNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  calculatedOperand: operand = null;
  hasPressedOperand = false;
  hasCalculated = false;
  calculatedResult: number | undefined = undefined;
  currentResult: number = 0;

  async setOperand(operand: operand) {
    this.hasPressedOperand = true;
    if (this.calculatedResult) {
      this.calculate(operand);
    } else {
      this.calculatedResult = this.currentResult;
    }

    this.calculatedOperand = operand;
  }

  async clear() {
    this.calculatedResult = undefined;
    this.currentResult = 0;
    this.calculatedOperand = null;
  }

  async appendComma() {
    if (this.currentResult.toString().indexOf(',') !== -1) {
      return;
    }
    const concat = `${this.currentResult},`;
    this.currentResult = concat as unknown as number;
  }

  async appendNumber(number: allowedNumbers) {
    if (this.hasCalculated || this.hasPressedOperand || this.currentResult === 0 || (number === 0 && this.currentResult === 0)) {
      this.currentResult = number
      this.hasCalculated = false;
      this.hasPressedOperand = false;
    } else {
      const concat = `${this.currentResult}${number}`;
      this.currentResult = concat as unknown as number;
    }
  }

  async calculate(operand?: operand) {
    const mock = true;
    const actualOperand = operand ?? this.calculatedOperand;

    if (mock) {
      switch (actualOperand) {
        case "*":
          this.calculatedResult = Number((this.calculatedResult ?? 1)) * Number(this.currentResult);
          break;
        case "/":
          this.calculatedResult = Number((this.calculatedResult ?? 1)) / Number(this.currentResult);
          break;
        case "+":
          this.calculatedResult = Number((this.calculatedResult ?? 0)) + Number(this.currentResult);
          break;
        case "-":
          this.calculatedResult = Number((this.calculatedResult ?? 0)) - Number(this.currentResult);
          break;
      }
    } else {
      // TODO: Call service
    }

    this.hasCalculated = true;
  }
}
