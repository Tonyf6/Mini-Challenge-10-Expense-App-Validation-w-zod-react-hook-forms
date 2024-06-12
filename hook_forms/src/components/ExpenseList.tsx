
import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseFilter from './ExpenseFilter';

type ExpenseSchema = {
  name: string;
  amount: number;
  category: string;
};

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseSchema[]>([]);
  const [filter, setFilter] = useState<string>('');

  const addExpense = (expense: ExpenseSchema) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const deleteExpense = (index: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  const filterExpenses = (filter: string) => {
    setFilter(filter.toLowerCase());
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(filter) ||
    expense.amount.toString().includes(filter) ||
    expense.category.toLowerCase().includes(filter)
  );

  return (
    <div>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseFilter filterExpenses={filterExpenses} />
      <ul>
        {filteredExpenses.map((expense, index) => (
          <li key={index}>
            {expense.name} - ${expense.amount.toFixed(2)} - {expense.category}
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
