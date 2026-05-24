import Link from "next/link";

export default function Navbar(){
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/add-expense">Add Expenses</Link>
            <Link href="/expenses">View Expenses</Link>
        </nav>
    );
}