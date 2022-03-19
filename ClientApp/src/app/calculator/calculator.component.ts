import { Component, Inject } from '@angular/core';

type operand = "/" | "*" | "*" | "-" | "+" | null
const allowedNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type allowedNumbers = typeof allowedNumbers[number];

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  calculatedOperand: operand = null;
  calculatedResult: number | undefined = undefined;
  hasPressedOperand = false;
  hasCalculated = false;
  currentResult = 0;

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
    this.calculatedOperand = null;
    this.calculatedResult = undefined;
    this.hasPressedOperand = false;
    this.hasCalculated = false;
    this.currentResult = 0;
  }

  async appendComma() {
    if (this.currentResult.toString().indexOf(',') !== -1) {
      return;
    }
    this.currentResult = await this.concat(this.currentResult, ",");
  }

  async appendNumber(number: allowedNumbers) {
    if (this.hasCalculated || this.hasPressedOperand || this.currentResult === 0 || (number === 0 && this.currentResult === 0)) {
      this.currentResult = number
      this.hasCalculated = false;
      this.hasPressedOperand = false;
    } else {
      this.currentResult = await this.concat(this.currentResult, number);
    }
  }

  async concat(concatOne: number | string, concatTwo: number | string): Promise<number> {
    return `${concatOne}${concatTwo}` as unknown as number;
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

  getArrayOfAllowedNumbers(numbers: number[]): allowedNumbers[] {
    return numbers.filter(this.isAllowedNumber);
  }

  isAllowedNumber(number: number): number is allowedNumbers {
    return number in allowedNumbers;
  }
}
