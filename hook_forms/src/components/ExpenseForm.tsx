import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type ExpenseSchema = {
  name: string;
  amount: number;
  date: string;
};

interface ExpenseFormProps {
  addExpense: (expense: ExpenseSchema) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than zero"),
    date: z.string().nonempty("Date is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ExpenseSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ExpenseSchema> = (data) => {
    addExpense(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Amount</label>
        <input type="number" step="0.01" {...register('amount', { valueAsNumber: true })} />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>
      <div>
        <label>Date</label>
        <input type="date" {...register('date')} />
        {errors.date && <p>{errors.date.message}</p>}
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
