
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type ExpenseSchema = {
  name: string;
  amount: number;
  category: string;
};

interface ExpenseFormProps {
  addExpense: (expense: ExpenseSchema) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than zero"),
    category: z.string().nonempty("Category is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ExpenseSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ExpenseSchema> = (data) => {
    addExpense(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Name</label>
        <input 
          {...register('name')} 
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input 
          type="number" 
          step="0.01" 
          {...register('amount', { valueAsNumber: true })} 
          className={errors.amount ? 'input-error' : ''}
        />
        {errors.amount && <p className="error-message">{errors.amount.message}</p>}
      </div>
      <div className="form-group">
        <label>Category</label>
        <select {...register('category')} className={errors.category ? 'input-error' : ''}>
          <option value="">Select a category</option>
          <option value="Utilities">Utilities</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Groceries">Groceries</option>
        </select>
        {errors.category && <p className="error-message">{errors.category.message}</p>}
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
