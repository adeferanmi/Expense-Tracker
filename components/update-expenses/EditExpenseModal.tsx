"use client";

import { useEffect, useState } from "react";
import styles from "./EditExpenseModal.module.css";

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

type Props = {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedExpense: Expense) => void;
};

export default function EditExpenseModal({
  expense,
  isOpen,
  onClose,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<Expense | null>(expense);

  useEffect(() => {
    if (!expense) return;

    setFormData({
      ...expense,
      date: expense.date
        ? expense.date.split("T")[0]
        : "",
    });
  }, [expense]);

  if (!isOpen || !formData) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
          }
        : null
    );
  }

    function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData) return;

    onSave(formData);
    onClose();
    }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Expense</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
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

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.saveBtn}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}