import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
 
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {BudgetProgressComponent } from './budget-progress/budget-progress.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ExpenseListComponent,BudgetProgressComponent,FormsModule ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expense';
}
