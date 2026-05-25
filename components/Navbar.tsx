import Link from "next/link";
import Image from "next/image";
import {
    FiGrid,
    FiDollarSign,
    FiLogOut,
    FiPlus,
} from "react-icons/fi";

export default function Navbar(){
    return (
        <aside className="navbar">
            <div className="logo-section">
                <Image src="/favicon.png" alt="App Logo" width={60} height={60} className="nav-logo"/>
                <h1 className="nav-text">Expense Tracker App</h1>
            </div>

            <div className="profile-section">
                <img src="https://i.pravatar.cc/100" alt="Profile Picture" className="profile-img"/>
                <h3>User</h3>
            </div>

            <nav className="sidebar-nav">
                <Link href="/dashboard" className="sidebar-link active">
                    <FiGrid/>
                    <span>Dashboard</span>
                </Link>
                <Link href="/add-expense">
                    <FiDollarSign/>
                    <span>Add/Delete Expenses</span>
                </Link>
                <Link href="/expenses">
                    <FiPlus/>
                    <span>View Expenses</span>
                </Link>
                <Link href="/login">
                    <FiLogOut/>
                    <span>Log out</span>
                </Link>
            </nav>

        </aside>
        
    );
}