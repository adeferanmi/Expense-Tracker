import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
    return (
        <header className="navbar">
        <div className="left-section">
            <Image src="/favicon.png" alt="App Logo" width={60} height={60} className="nav-logo"/>
            <h1 className="nav-text">Expense Tracker App</h1>
        </div>

        <nav>
            <Link href="/">Home</Link>
            <Link href="/add-expense">Add/Delete Expenses</Link>
            <Link href="/expenses">View Expenses</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
        </nav>

        </header>
        
    );
}