"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./analytics.module.css";
import Image from "next/image";
import SpendingLineChart from "@/components/analytics/SpendingLineChart";
import CategoryPieChart from "@/components/analytics/CategoryPieChart";
import RecentTransactions from "@/components/analytics/RecentTransactions";

export default function Analytics(){
    const [analytics, setAnalytics] = useState<any>(null);
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

            const token =
                localStorage.getItem("token");

            if (!token) return;

            const expensesResponse =
                await fetch(
                    "http://localhost:5000/expenses?limit=5",
                    {
                    headers: {
                        Authorization:
                        `Bearer ${token}`,
                    },
                    }
                );

                const expensesData =
                await expensesResponse.json();

                setRecentTransactions(expensesData);

            const response =
                await fetch(
                "http://localhost:5000/expenses/analytics",
                {
                    headers: {
                    Authorization:
                        `Bearer ${token}`,
                    },
                }
                );

            const data =
                await response.json();

            console.log(data);

            setAnalytics(data);

            } catch (error) {

            console.error(error);

            }

        };

        fetchAnalytics();

    }, []);

    const weeklySpendingOverTime = [
        { date: "Mon", amount: 4000 },
        { date: "Tue", amount: 3000 },
        { date: "Wed", amount: 5000 },
        { date: "Thu", amount: 2000 },
        { date: "Fri", amount: 7000 },
    ];
    const monthlySpendingOverTime =
        analytics?.monthlyBreakdown?.map(
            (item: any) => ({
            date: item.month,
            amount: item.amount,
            })
        ) ?? [];
    const weeklyCategoryData = [
        { name: "Food", value: 12000 },
        { name: "Transport", value: 5000 },
        { name: "Shopping", value: 8000 },
    ];
    const monthlyCategoryData =
        analytics?.categoryBreakdown?.map(
            (item: any) => ({
            name: item.category,
            value: item.amount,
            })
        ) ?? [];

    return(
        <main className="main-content">

            <div className={styles.titleContentAnalytics}>
                <Image src="/favicon.png" alt="logo" width={50} height={50}/>
                <h1 className={styles.titleTextAnalytics}>Analytics</h1>
            </div>

            <Navbar/>

      {/* STATS GRID */}
            <section className={styles.analyticsGrid}>
                <div className={styles.analyticsCard}>
                <h3>Total Spent</h3>
                <p>₦{analytics?.overview?.totalExpenses ?? 0}</p>
                </div>

                <div className={styles.analyticsCard}>
                <h3>Transactions</h3>
                <p>{analytics?.overview?.totalTransactions ?? 0}</p>
                </div>

                <div className={styles.analyticsCard}>
                <h3>Highest Expense</h3>
                <p>₦{analytics?.overview?.highestExpense ?? 0}</p>
                </div>

                <div className={styles.analyticsCard}>
                <h3>Average Expense</h3>
                <p>₦{Math.round(
                     analytics?.overview?.averageExpense ?? 0
                )}</p>
                </div>
            </section>

            <RecentTransactions
                transactions={
                    recentTransactions.map(
                    (expense: any) => ({
                        title: expense.title,
                        amount: expense.amount,
                        category: expense.category,
                        date: new Date(
                        expense.createdAt
                        ).toLocaleDateString(),
                    })
                    )
                }
            />

            <div className={styles.analyticsCharts}>
                <h2 className={styles.weeklyHeader}>Weekly Expenses</h2><br/>
                <SpendingLineChart data={weeklySpendingOverTime}/>
                <CategoryPieChart data={weeklyCategoryData} />
            </div>
            <div className={styles.analyticsCharts}>
                <h2 className={styles.monthlyHeader}>Monthly Expenses</h2><br/>
                <SpendingLineChart data={monthlySpendingOverTime}/>
                <CategoryPieChart data={monthlyCategoryData} />
            </div>
        </main>
    ); 
}