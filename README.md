# Expense Tracker Frontend

## Overview

This is the frontend for the **Expense Tracker** web application, built with **Angular 18**. It allows users to track their expenses, categorize them, set a monthly budget, and receive alerts when they exceed the budget.

## Features

- **Add Expense**: Users can add expenses with details like amount, category, and description.
- **View Expenses**: Display a list of expenses and their details.
- **Delete Expense**: Users can delete expenses they no longer need.
- **Categorize Expenses**: Expenses can be categorized (e.g., Food, Transport, Entertainment).
- **Set Monthly Budget**: Users can set and view their monthly budget.
- **Budget Alerts**: Users are notified when their total expenses exceed the set budget.

## Technologies

- **Angular 18**: Frontend framework.
- **Bootstrap/Tailwind CSS**: For styling and responsive layout.
- **RxJS**: For handling asynchronous operations.
- **JWT Authentication**: For securing the user’s session.

## Setup and Installation

### Prerequisites

- Install **Node.js** and **npm**: [Download Node.js](https://nodejs.org/).
- Install **Angular CLI**: 
  ```bash
  npm install -g @angular/cli
Installation Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/expense-tracker-frontend.git
Navigate to the project folder:

bash
Copy code
cd expense-tracker-frontend
Install the required dependencies:

bash
Copy code
npm install
Update the environment.ts file with the backend API URL (e.g., http://localhost:5000).

Run the application:

bash
Copy code
ng serve
The frontend will be running on http://localhost:4200.
