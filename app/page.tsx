import Link from "next/link";

export default function Home(){
  return(
    <main>
      <h2>Expense Tracker Homepage</h2>

      <nav>
        <Link href="/">Home</Link> |{" "}
        <Link href="/add-expenses">Add Expenses</Link> |{" "}
        <Link href="/expenses">View Expenses</Link>
      </nav>

      <p>Welcome! This is an app to track your daily spending.</p>
    </main>
  );
}