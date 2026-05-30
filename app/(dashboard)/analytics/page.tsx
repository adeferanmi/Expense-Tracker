"use client";
import Navbar from "@/components/Navbar";
import styles from "./analytics.module.css";
import Image from "next/image";
import SpendingLineChart from "@/components/update-expenses/analytics/SpendingLineChart";
import CategoryPieChart from "@/components/update-expenses/analytics/CategoryPieChart";

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
    const weeklySpendingOverTime = [
        { date: "Mon", amount: 4000 },
        { date: "Tue", amount: 3000 },
        { date: "Wed", amount: 5000 },
        { date: "Thu", amount: 2000 },
        { date: "Fri", amount: 7000 },
    ];
    const monthlySpendingOverTime = [
        { date: "Jan", amount: 4000 },
        { date: "Feb", amount: 3000 },
        { date: "March", amount: 5000 },
        { date: "Apr", amount: 2000 },
        { date: "May", amount: 7000 },
    ];

    const weeklyCategoryData = [
        { name: "Food", value: 12000 },
        { name: "Transport", value: 5000 },
        { name: "Shopping", value: 8000 },
    ];
    const monthlyCategoryData = [
        { name: "Food", value: 40000 },
        { name: "Transport", value: 25000 },
        { name: "Shopping", value: 80000 },
    ];

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

            <div className={styles.analyticsCharts}>
                <SpendingLineChart data={weeklySpendingOverTime}/>
                <CategoryPieChart data={weeklyCategoryData} />
                <SpendingLineChart data={monthlySpendingOverTime}/>
                <CategoryPieChart data={monthlyCategoryData} />
            </div>
        </main>
    ); 
}