import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';

export type operand = "/" | "*" | "*" | "-" | "+";
const allowedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export type allowedNumbers = typeof allowedNumbers[number];

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  constructor(private calculatorService: CalculatorService) {}
  
  private _calculatedResult: string | undefined = undefined;
  calculatedOperand: operand | null = null;
  hasCalculated = false;
  currentResult = "0";

  async setOperand(operand: operand) {
    // This has to happen first, we need to calculate with the last set
    this.calculate(this.calculatedOperand ?? operand);
    // This has to happen second
    this.calculatedOperand = operand;
  }

  async clear() {
    this.calculatedOperand = null;
    this.calculatedResult = undefined;
    this.hasCalculated = false;
    this.currentResult = "0";
  }

  async appendComma() {
    if (this.currentResult.toString().indexOf('.') !== -1 || this.currentResult === "0") {
      return;
    }
    this.currentResult = await this.concat(this.currentResult, ".");
  }

  async appendNumber(number: allowedNumbers) {
    if (this.hasCalculated || this.currentResult === "0") {
      this.currentResult = `${number}`
      this.hasCalculated = false;
    } else {
      this.currentResult = await this.concat(this.currentResult, number);
    }
  }

  async concat(concatOne: number | string, concatTwo: number | string): Promise<string> {
    return `${concatOne}${concatTwo}`;
  }

  async calculate(operand?: operand) {
    if (!this.calculatedOperand && !operand) {
      return;
    }

    // No need to do any calculations if no previous result
    if (!this.calculatedResult) {
      this.calculatedResult = this.currentResult;
    } else {
      const actualOperand = operand ?? this.calculatedOperand;
      if (actualOperand) {
        (await this.calculatorService.calculate(Number(this.calculatedResult), actualOperand, Number(this.currentResult))).subscribe(result => {
          this.calculatedResult = result.result.toString();
        }); 
      }
    }

    this.hasCalculated = true;
    this.currentResult = "0";
  }

  getArrayOfAllowedNumbers(numbers: string[]): allowedNumbers[] {
    return numbers.filter(this.isAllowedNumber);
  }

  isAllowedNumber(number: string): number is allowedNumbers {
    return number in allowedNumbers;
  }

  set calculatedResult(value: string | undefined) {
    if (value && value[value.length - 1] === ".") {
      value = value.slice(0, -1);
    }
    this._calculatedResult = value;
  }

  get calculatedResult() {
    return this._calculatedResult;
  }
}
