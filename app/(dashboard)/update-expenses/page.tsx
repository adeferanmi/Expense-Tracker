"use client";

import { useState, useEffect } from "react";
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
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {

        const fetchExpenses = async () => {

            try {

                const token =
                localStorage.getItem("token");

                if (!token) return;

                const response =
                    await fetch(
                        "http://localhost:5000/expenses",
                        {
                            headers: {
                            Authorization:
                            `Bearer ${token}`,
                        },
                    }         
                );

                const data =
                    await response.json();

                    setExpenses(
                        data.map((expense: any) => ({
                            id: expense.id.toString(),
                            title: expense.title,
                            amount: expense.amount,
                            category: expense.category,
                            date: expense.createdAt,
                        }))
                        );

                } catch (error) {

                    console.error(error);

                }
            };

    fetchExpenses();

    }, []);

    const [selectedExpense, setSelectedExpense] =
        useState<Expense | null>(null);

    const [isModalOpen, setIsModalOpen] =
        useState(false);
    
async function handleAddExpense(
  expense: Omit<Expense, "id">
) {

  console.log(expense);
  try {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    const response =
      await fetch(
        "http://localhost:5000/expenses",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
          })
        }
      );

    const newExpense =
      await response.json();

    setExpenses((prev) => [

      {
        id: newExpense.id.toString(),
        title: newExpense.title,
        amount: newExpense.amount,
        category: newExpense.category,
        date: newExpense.createdAt,
      },

      ...prev,
    ]);

  } catch (error) {

    console.error(error);

  }
}

  function handleEdit(expense: Expense) {
  setSelectedExpense(expense);
  setIsModalOpen(true);
}

async function handleSave(
  updatedExpense: Expense
) {
  try {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    const response =
      await fetch(
        `http://localhost:5000/expenses/${updatedExpense.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: updatedExpense.title,
            amount: updatedExpense.amount,
            category: updatedExpense.category,
          }),
        }
      );

    const savedExpense =
      await response.json();

    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id ===
        savedExpense.id.toString()
          ? {
              id:
                savedExpense.id.toString(),
              title:
                savedExpense.title,
              amount:
                savedExpense.amount,
              category:
                savedExpense.category,
              date:
                savedExpense.createdAt,
            }
          : expense
      )
    );

  } catch (error) {

    console.error(error);

  }
}
  return (
    <main className="main-content">
      <Navbar />
    <div className={styles.titleContent}>
    <Image src="/favicon.png" alt="logo" width={50} height={50}/>
    <h1 className={styles.expensesPageTitle}>Update Expenses</h1>
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