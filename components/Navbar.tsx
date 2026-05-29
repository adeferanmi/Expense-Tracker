import Link from "next/link";

export default function Navbar(){
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/add-expense">Add Expenses</Link>
            <Link href="/expenses">View Expenses</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
        </nav>
    );
}