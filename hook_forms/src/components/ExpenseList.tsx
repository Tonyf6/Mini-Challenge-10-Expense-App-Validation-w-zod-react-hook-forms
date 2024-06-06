import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';

type ExpenseSchema = {
  name: string;
  amount: number;
  date: string;
};

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseSchema[]>([]);

  const addExpense = (expense: ExpenseSchema) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div>
      <ExpenseForm addExpense={addExpense} />
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name} - ${expense.amount.toFixed(2)} - {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
