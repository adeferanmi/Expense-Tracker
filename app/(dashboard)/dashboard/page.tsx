"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import QuickActions from "@/components/dashboard/QuickActions";
import styles from "./dashboard.module.css"
import SummaryCards from "@/components/dashboard/SummaryCards";
import SpendingLineChart from "@/components/analytics/SpendingLineChart";
import Image from "next/image";
import RecentTransactions from "@/components/analytics/RecentTransactions";
import BudgetProgress from "@/components/dashboard/BudgetProgress";

export default function Dashboard(){
    const [analytics, setAnalytics] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [budgetOverview, setBudgetOverview] = useState<any>([]);

    useEffect(() => {

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const budgetResponse =
                await fetch(
                    "http://localhost:5000/budgets/overview",
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`,
                        },
                    }
                );

            const userResponse =
                await fetch(
                    "http://localhost:5000/auth/me",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const analyticsResponse =
                await fetch(
                    "http://localhost:5000/expenses/analytics",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const userData =
                await userResponse.json();

            const analyticsData =
                await analyticsResponse.json();

            const budgetData =
                await budgetResponse.json();

            console.log(
                "BUDGETS:",
                budgetData
            );

            console.log(
                "USER:",
                userData
            );

            console.log(
                "ANALYTICS:",
                analyticsData
            );

            setUser(userData);
            setAnalytics(analyticsData);
            setBudgetOverview(budgetData);

        } catch (error) {

            console.error(error);

        }
    };

    fetchDashboardData();

}, []);

    const monthlySpendingOverTime = analytics?.monthlyBreakdown ?? [];

    const recentTransactions = [
    {
        title: "Lunch",
        amount: 1500,
        category: "Food",
        date: "May 27",
    },
    {
        title: "Bus Fare",
        amount: 1000,
        category: "Transport",
        date: "May 26",
    },
        {
        title: "Dress",
        amount: 500,
        category: "Shopping",
        date: "May 27",
    },
    {
        title: "Uber",
        amount: 3600,
        category: "Transport",
        date: "Jan 12",
    },
    ];

    return (
        <main className="main-content">
            <Navbar/>

            <div className={styles.dashboardPage}>
                <div className={styles.titleContent}>
                    <Image src="/favicon.png" alt="logo" width={50} height={50}/>
                    <h1 className={styles.titleText}>Dashboard</h1>
                </div>

                <section className={styles.dashboardHero}>
                    <WelcomeCard user={user} analytics={analytics} />
                    <QuickActions/>
                </section>
            </div>
            <SummaryCards analytics={analytics} budgetOverview={budgetOverview}/>

            <h3 className={styles.title}>Spending Overview</h3>
            <div className={styles.lineChart}>
                <SpendingLineChart data={monthlySpendingOverTime}/>
            </div>

            <div className={styles.lowerContent}>
                <div className={styles.recents}><RecentTransactions
                    transactions={recentTransactions}
                /></div>
                <div className={styles.budget}><BudgetProgress/></div>
            </div>

        </main>
    );
}