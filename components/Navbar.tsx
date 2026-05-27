"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiDollarSign,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="navbar">

      <div className="logo-section">
        <h3 className="nav-text">Expense Tracker</h3>
        <Image
          src="/favicon.png"
          alt="App Logo"
          className="nav-logo"
          width={45}
          height={45}
        />
      </div>

      <div className="profile-section">
        <img
          src="/male1.png" width={60} height={60}
          alt="Profile Picture"
          className="profile-img"
        />

        <h3>User</h3>
      </div>

      <nav className="sidebar-nav">

        <Link
          href="/dashboard"
          className={`sidebar-link ${
            pathname === "/dashboard" ? "active" : ""
          }`}
        >
          <FiGrid />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/add-expense"
          className={`sidebar-link ${
            pathname === "/add-expense" ? "active" : ""
          }`}
        >
          <FiDollarSign />
          <span>Add/Delete Expenses</span>
        </Link>

        <Link
          href="/expenses"
          className={`sidebar-link ${
            pathname === "/expenses" ? "active" : ""
          }`}
        >
          <FiPlus />
          <span>View Expenses</span>
        </Link>

        <Link
          href="/login"
          className={`sidebar-link ${
            pathname === "/login" ? "active" : ""
          }`}
        >
          <FiLogOut />
          <span>Log out</span>
        </Link>

      </nav>
    </aside>
  );
}