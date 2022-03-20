import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { operand } from '../calculator/calculator.component';

@Injectable({
  providedIn: 'root'
})

export class CalculatorService {
  private apiUrl = '';
  private apiClient: HttpClient;
  
  constructor(http: HttpClient, @Inject('BASE_API_URL') baseApiUrl: string) { 
    this.apiUrl = `${baseApiUrl}`
    this.apiClient = http;
  }

  async calculate(calculatedResult: number, operand: operand, currentResult: number) {
    const calculateObject: CalculateObject = {
      calculatedResult,
      operand,
      currentResult
    }
    return this.apiClient.post<CalculatedResult>(this.apiUrl + 'calculator', calculateObject);
  }
}

interface CalculateObject {
  calculatedResult: number;
  operand: operand;
  currentResult: number;
}

interface CalculatedResult {
  result: number;
}