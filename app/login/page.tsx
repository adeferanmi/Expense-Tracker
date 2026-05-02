"use client";
import Link from "next/link";

export default function Login(){
    return (
      <main>
        <h2>Login</h2>

        <nav>
            <Link href="/">Home</Link> |{" "}
            <Link href="/add-expense">Add Expenses</Link> |{" "}
            <Link href="/expenses">View Expenses</Link> |{" "}
            <Link href="/login">Login</Link> |{" "}
            <Link href="/signup">Signup</Link> |{" "}
        </nav>

        <form>
            <div>
                <p>Email: </p>
                <input type="email" placeholder="example@mail.com"/>
            </div>
            <div>
                <p>Password: </p>
                <input type="password" placeholder="Enter your password"/>
            </div>
            <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
      </main>  
    );
}