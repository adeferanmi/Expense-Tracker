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
    const [expenses, setExpenses] = useState<any>([]);

    useEffect(() => {

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const userResponse =
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const analyticsResponse =
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/expenses/analytics`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );
  
            const budgetResponse =
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/budgets/overview`,
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`,
                        },
                    }
                );        
                
            const expensesResponse =
                await fetch(
                    `http://localhost:5000/expenses`,
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

            const expensesData =
                await expensesResponse.json();

            console.log(
                "USER:",
                userData
            );

            console.log(
                "ANALYTICS:",
                analyticsData
            );

            console.log(
                "BUDGETS:",
                budgetData
            );

            setUser(userData);
            setAnalytics(analyticsData);
            setBudgetOverview(budgetData);
            setExpenses(expensesData);

        } catch (error) {

            console.error(error);

        }
    };

    fetchDashboardData();

}, []);

    const monthlySpendingOverTime =
        analytics?.monthlyBreakdown?.map(
            (item: any) => ({
                date: item.month,
                amount: item.amount,
            })
        ) ?? [];

    console.log(monthlySpendingOverTime);

    const recentTransactions =
        expenses
            .sort(
                (a: any, b: any) =>
                    new Date(
                        b.createdAt
                    ).getTime() -
                    new Date(
                        a.createdAt
                    ).getTime()
            )

            .slice(0, 5)

            .map((expense: any) => ({
                title:
                    expense.title,

                amount:
                    expense.amount,

                category:
                    expense.category,

                date:
                    new Date(
                        expense.createdAt
                    ).toLocaleDateString(),
            }));

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
                <div className={styles.budget}><BudgetProgress budgets={budgetOverview}/></div>
            </div>

        </main>
    );
}