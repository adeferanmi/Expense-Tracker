"use client";

import Link from "next/link";

export default function Expenses(){
    return (
        <main>
            <h2>View Your Expenses</h2>

            <nav>
                <Link href="/">Home</Link>
                <Link href="/add-expense">Add Expenses</Link>
                <Link href="/expenses">Expenses</Link>
                <Link href="/login">Login</Link>
                <Link href="/signup">Signup</Link>
            </nav>

            <p>No expenses added here yet.</p>
        </main>
    );
}