import React from 'react';
import ExpenseList from './components/ExpenseList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseList />
    </div>
  );
};

export default App;

