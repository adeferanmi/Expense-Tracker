"use client";
import Navbar from "@/components/Navbar";
import ExpenseCard from "@/components/ExpenseCard";
import ExpenseForm from "@/components/ExpenseForm";

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
    ];

    return(
        <main>
            <h2>Update Expenses</h2>

            <Navbar/>
            <ExpenseForm/>

            <section>
                {expenses.map((expense, index) => (
                <ExpenseCard
                    key={index}
                    title={expense.title}
                    amount={expense.amount}
                    category={expense.category}
                    date={expense.date}
                />
                ))}
            </section>
        </main>
    ); 
}