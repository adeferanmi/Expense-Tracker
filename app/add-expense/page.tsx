"use client";

import Link from "next/link";

export default function AddExpense(){
    return(
        <main>
            <h2>Add Expenses</h2>

            <nav>
                <Link href="/">Home</Link> |{" "}
                <Link href="/add-expense">Add Expenses</Link> |{" "}
                <Link href="/expenses">View Expenses</Link>
            </nav>

            <p>Form to add the expenses to be added later.</p>
        </main>
    ); 
}