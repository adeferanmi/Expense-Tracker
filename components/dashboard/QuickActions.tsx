"use client";

import Link from "next/link";
import styles from "./QuickActions.module.css";

const actions = [
  {
    title: "Add Expense",
    icon: "➕",
    href: "/update-expenses",
  },
  {
    title: "Budgets",
    icon: "💰",
    href: "/budgets",
  },
  {
    title: "Analytics",
    icon: "📊",
    href: "/analytics",
  },
  {
    title: "Logout",
    icon: "📋",
    href: "/login",
  },
];

export default function QuickActions() {
  return (
    <div className={styles.quickActionsCard}>
      <h2 className={styles.heading}>Quick Actions</h2>

      <div className={styles.actionsGrid}>
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className={styles.actionTile}
          >
            <span className={styles.icon}>{action.icon}</span>
            <span className={styles.title}>{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}