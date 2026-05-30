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

    const monthlySpendingOverTime = [
        { date: "Jan", amount: 4000 },
        { date: "Feb", amount: 3000 },
        { date: "March", amount: 5000 },
        { date: "Apr", amount: 2000 },
        { date: "May", amount: 7000 },
    ];

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
                    <WelcomeCard/>
                    <QuickActions/>
                </section>
            </div>
            <SummaryCards/>

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