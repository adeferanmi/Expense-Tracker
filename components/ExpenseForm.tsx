"use client";

import { useState } from "react";

export default function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ title, amount, category });

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>

      <h2 className="expense-title">Add New Expense</h2>

      <div className="form-row">
        <label>Expense Title</label>
        <input
          placeholder="Groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Amount</label>
        <input
          type="number"
          placeholder="₦12000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
      </div>

      <button className="expense-btn" type="submit">
        Add Expense
      </button>

    </form>
  );
}