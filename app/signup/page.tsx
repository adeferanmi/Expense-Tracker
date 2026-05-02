"use client";

import Link from "next/link";

export default function Signup(){
    return (
        <main>
            <h2>Sign Up</h2>

            <nav>
                <Link href="/">Home</Link>
                <Link href="/add-expense">Add Expenses</Link>
                <Link href="/expenses">View Expenses</Link>
                <Link href="/login">Login</Link>
                <Link href="/signup">Signup</Link>
            </nav>

            <form>
                <div>
                    <p>Full name: </p>
                    <input type="text" placeholder="Enter your full name"/>
                </div>
                <div>
                    <p>Email: </p>
                    <input type="email" placeholder="example@mail.com"/>
                </div>
                <div>
                    <p>Password: </p>
                    <input type="password" placeholder="Enter a password"/>
                </div>

                <button type="submit">Sign Up</button>
            </form>

            <p>Already have an account? <Link href="/login">Login</Link></p>
        </main>
    );
}