"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiDollarSign,
  FiLogOut,
  FiPlus,
  FiEdit,
  FiPieChart,
  FiBarChart2,
  FiBarChart,
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
          href="/update-expenses"
          className={`sidebar-link ${
            pathname === "/update-expenses" ? "active" : ""
          }`}
        >
          <FiDollarSign />
          <span>Update Expenses</span>
        </Link>

        <Link
          href="/budgets"
          className={`sidebar-link ${
            pathname === "/budgets" ? "active" : ""
          }`}
        >
          <FiPieChart/>
          <span>Budgets</span>
        </Link>

        <Link
          href="/analytics"
          className={`sidebar-link ${
            pathname === "/analytics" ? "active" : ""
          }`}
        >
          <FiBarChart2/>
          <span>Analytics</span>
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