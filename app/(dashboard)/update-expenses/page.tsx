"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import AddExpenseForm from "@/components/update-expenses/AddExpenseForm";
import styles from "./update-expenses.module.css";
import ExpenseCard from "@/components/update-expenses/ExpenseCard";
import EditExpenseModal from "@/components/update-expenses/EditExpenseModal";
import Image from "next/image";

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([
    {
        id: "1",
        title: "Groceries",
        amount: 5000,
        category: "Food",
        date: "2026-05-30",
    },
    {
        id: "2",
        title: "Sneakers",
        amount: 14000,
        category: "Shopping",
        date: "2026-01-04",
    },
    {
        id: "3",
        title: "Petrol",
        amount: 10000,
        category: "Transport",
        date: "2026-01-04",
    },     {
        id: "4",
        title: "Income Tax",
        amount: 2510,
        category: "Bills",
        date: "2026-01-04",
    },     {
        id: "5",
        title: "Electronics",
        amount: 30000,
        category: "Others",
        date: "2024-11-04",
    },     
    ]);

    const [selectedExpense, setSelectedExpense] =
        useState<Expense | null>(null);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

  function handleAddExpense(expense: Omit<Expense, "id">) {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...expense,
    };

    setExpenses((prev) => [newExpense, ...prev]);
  }

  function handleEdit(expense: Expense) {
  setSelectedExpense(expense);
  setIsModalOpen(true);
}

    function handleSave(updatedExpense: Expense) {
    setExpenses((prev) =>
        prev.map((expense) =>
        expense.id === updatedExpense.id
            ? updatedExpense
            : expense
        )
    );
}
  return (
    <main className="main-content">
      <Navbar />
    <div className={styles.titleContent}>
    <Image src="/favicon.png" alt="logo" width={50} height={50}/>
    <h1 className={styles.expensesPageTitle}>Expenses</h1>
    </div>

      <AddExpenseForm onAddExpense={handleAddExpense} />

      <h2 className={styles.recentExpensesTitle}>Expenses You've Added:</h2>

        <div className={styles.expenseGrid}>
            {expenses.map((exp) => (
                <ExpenseCard
                key={exp.id}
                expense={exp}
                onEdit={handleEdit}
                onDelete={(id) =>
                    setExpenses((prev) =>
                    prev.filter((e) => e.id !== id)
                    )
                }
                />
            ))}
        </div>

        <EditExpenseModal
            expense={selectedExpense}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
        />

    </main>
  );
}