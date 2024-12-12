import { Component } from '@angular/core';

@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-progress.component.html',
  styleUrls: ['./budget-progress.component.css'],
  standalone: true,
})
export class BudgetProgressComponent {
  // Define the budget data
  budget = {
    monthlyBudget: 1000, // set your monthly budget
    currentSpending: 250, // set your current spending
    get remainingBudget() {
      return this.monthlyBudget - this.currentSpending;
    },
    get remainingBudgetPercentage() {
      return ((this.remainingBudget / this.monthlyBudget) * 100).toFixed(2);
    }
  };
}

