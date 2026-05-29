"use client";
import Navbar from "@/components/Navbar";
import ExpenseCard from "@/components/update-expenses/ExpenseCard";
import ExpenseForm from "@/components/update-expenses/ExpenseForm";

export default function AddExpense(){
    const expenses = [
        {
        title: "Groceries",
        amount: 12000,
        category: "Food",
        date: "May 28, 2026",
        },
        {
        title: "Uber Ride",
        amount: 4500,
        category: "Transport",
        date: "May 27, 2026",
        },
        {
        title: "Converse Sneakers",
        amount: 15500,
        category: "Shopping",
        date: "May 12, 2026",
        },        {
        title: "Income Taxes",
        amount: 45000,
        category: "Bills",
        date: "May 2, 2026",
        },
    ];

    return(
        <main className="expenses-page">
            <h1 className="expenses-page-title">Update Expenses</h1>

            <Navbar/>
            <ExpenseForm/>

            <section className="expenses-list">
                <div className="expense-grid">
                    {expenses.map((expense, index) => (
                <ExpenseCard
                    key={index}
                    title={expense.title}
                    amount={expense.amount}
                    category={expense.category}
                    date={expense.date}
                />
                ))}
                </div>
            </section>
        </main>
    ); 
}