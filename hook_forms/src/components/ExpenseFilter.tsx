import React from 'react';

interface ExpenseFilterProps {
  filterExpenses: (filter: string) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ filterExpenses }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterExpenses(event.target.value);
  };

  return (
    <div className="form-group">
      <label>Filter Expenses</label>
      <input type="text" onChange={handleFilterChange} placeholder="Filter by name, amount, or date" />
    </div>
  );
};

export default ExpenseFilter;
