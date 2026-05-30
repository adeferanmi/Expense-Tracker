"use client";
import Navbar from "@/components/Navbar";
import styles from "./analytics.module.css";
import Image from "next/image";

export default function Analytics(){
    const analytics = {
    totalExpenses: 85000,
    totalTransactions: 42,
    highestExpense: 45000,
    averageExpense: 1564,
    categoryBreakdown: [
      { category: "Food", total: 34000 },
      { category: "Transport", total: 18000 },
      { category: "Shopping", total: 22000 },
      { category: "Bills", total: 11000 },
    ],
    monthlyBreakdown: [
      { month: "Jan", total: 12000 },
      { month: "Feb", total: 15000 },
      { month: "Mar", total: 10000 },
      { month: "Apr", total: 18000 },
      { month: "May", total: 25000 },
    ],
  };
    return(
        <main className="main-content">

            <div className={styles.titleContentAnalytics}>
                <Image src="/favicon.png" alt="logo" width={50} height={50}/>
                <h1 className={styles.titleTextAnalytics}>View Your Analytics</h1>
            </div>

            <Navbar/>

      {/* STATS GRID */}
            <section className={styles.analyticsGrid}>
                <div className={styles.analyticsCard}>
                <h3>Total Spent</h3>
                <p>₦{analytics.totalExpenses}</p>
                </div>

                <div className={styles.analyticsCard}>
                <h3>Transactions</h3>
                <p>{analytics.totalTransactions}</p>
                </div>

                <div className={styles.analyticsCard}>
                <h3>Highest Expense</h3>
                <p>₦{analytics.highestExpense}</p>
                </div>

                <div className={styles.analyticsCard}>
                <h3>Average Expense</h3>
                <p>₦{analytics.averageExpense}</p>
                </div>
            </section>
        </main>
    ); 
}