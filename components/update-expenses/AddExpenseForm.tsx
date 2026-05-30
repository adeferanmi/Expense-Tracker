"use client";

import { useState } from "react";
import styles from "./AddExpenseForm.module.css"

type ExpenseInput = {
  title: string;
  amount: number;
  category: string;
  date: string;
};

type Props = {
  onAddExpense: (expense: ExpenseInput) => void;
};

export default function AddExpenseForm({ onAddExpense }: Props) {
  const [formData, setFormData] = useState<ExpenseInput>({
    title: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.category) return;

    onAddExpense(formData);

    setFormData({
      title: "",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add New Expense</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Groceries"
          />
        </div>

        <div className={styles.field}>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div className={styles.field}>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Add Expense
      </button>
    </form>
  );
}