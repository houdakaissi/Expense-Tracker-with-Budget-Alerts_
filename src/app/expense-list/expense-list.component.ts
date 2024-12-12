import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule for ngModel
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent {
  monthlyBudget: number = 1000;
  newExpense: any = { description: '', amount: 0, category: '', date: '' }; // New expense object
  expense = {
    description: '',
    amount: null,
    category: '',
    date: '',
    userId: null, // Will be set dynamically
  };
  showForm = false;
  expenses: any[] = []; // Array to store expenses
  selectedExpense: any = null; // The expense being edited
  loading: boolean = false; // For loading state
  error: string = ''; // For error message
  budgetExceeded: boolean = false; // Flag to track if budget is exceeded

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadExpenses(); // Load expenses when the component initializes
  }

  openForm() {
    this.selectedExpense = null; // Clear selected expense for adding a new one
    this.showForm = true;  // Show the form when the button is clicked
    this.expense = { description: '', amount: null, category: '', date: '', userId: null }; // Reset the form
  }

  closeForm() {
    this.showForm = false;  // Close the form
  }

  // Fetch expenses from the backend
 

  onSubmit() {
    const expenseData = {
      description: this.expense.description,
      amount: this.expense.amount,
      category: this.expense.category,
      date: new Date(this.expense.date).toISOString(),
      userId: this.expense.userId,
    };
  
    if (this.selectedExpense) {
      // If an expense is being updated, call updateExpense method
      this.updateExpense(expenseData);
    } else {
      // If a new expense is being added
      this.http.post('http://localhost:5167/api/Expense', expenseData).subscribe(
        (response) => {
          console.log('Expense added successfully:', response);
          this.loadExpenses(); // Reload expenses after adding
        },
        (error) => {
          console.error('Error adding expense:', error);
        }
      );
    }
  }
  
  // Check if total expenses exceed the monthly budget after adding a new expense
  checkTotalExpenses() {
    const totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log('Total Expenses:', totalExpenses); // Debugging line to check total
  
    if (totalExpenses > this.monthlyBudget) {
      alert('Warning: Total expenses exceed the monthly budget!');
    } else {
      alert('Warning: Total expenses exceed the monthly budget!');
    }
  }
  
  loadExpenses() {
    this.loading = true;
    this.error = ''; // Clear previous errors
    this.http.get<any[]>('http://localhost:5167/api/Expense').subscribe({
      next: (data) => {
        this.expenses = data;
        this.loading = false;
        this.checkTotalExpenses(); // Check if the total exceeds the budget after loading
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
        this.error = 'Failed to load expenses. Please try again later.';
        this.loading = false;
      },
    });
  }
  
  // Delete an expense by ID
  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.http.delete(`http://localhost:5167/api/Expense/${id}`).subscribe({
        next: () => {
          this.expenses = this.expenses.filter((expense) => expense.id !== id);
          alert('Expense deleted successfully!');
          this.checkTotalExpenses(); // Recheck the total after deletion
        },
        error: (err) => console.error('Error deleting expense:', err),
      });
    }
  }

  // Open the edit form with the selected expense
  editExpense(expense: any) {
    this.selectedExpense = { ...expense }; // Clone the selected expense to avoid direct modification
    this.expense = { ...expense }; // Pre-fill the form with the selected expense data
    this.showForm = true; // Show the form for editing
  }

  // Update the expense on the backend
  updateExpense(expenseData: any) {
    if (this.selectedExpense) {
      this.http.put(`http://localhost:5167/api/Expense/${this.selectedExpense.id}`, expenseData).subscribe({
        next: () => {
          const index = this.expenses.findIndex((expense) => expense.id === this.selectedExpense.id);
          if (index !== -1) {
            this.expenses[index] = { ...expenseData, id: this.selectedExpense.id }; // Update the expense in the list
          }
          this.selectedExpense = null; // Clear selected expense after update
          this.closeForm(); // Close the form
          alert('Expense updated successfully!');
          this.checkTotalExpenses(); // Check total after update
        },
        error: (err) => console.error('Error updating expense:', err),
      });
    }
  }

  // Cancel editing and close the edit form
  cancelEdit() {
    this.selectedExpense = null; // Close the edit form without saving changes
    this.closeForm(); // Close the form
  }
}
