"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import OverallBudgetHealth from "@/components/budgets/OverallBudgetHealth";
import BudgetSummaryCard from "@/components/budgets/BudgetSummaryCard";
import styles from "./budgets.module.css"
import BudgetChartCard from "@/components/budgets/BudgetChartCard";
import ManageBudgetButton from "@/components/budgets/ManageBudgetButton";
import BudgetModal from "@/components/budgets/BudgetModal";
import Image from "next/image";

export default function Budgets(){
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"weekly" | "monthly">("weekly");

    const [weeklyBudgets, setWeeklyBudgets] = useState([
    { name: "Food", limit: 20000 },
    { name: "Transport", limit: 15000 },
    { name: "Shopping", limit: 20000 }
    ]);

    const [monthlyBudgets, setMonthlyBudgets] = useState([
    { name: "Food", limit: 80000 },
    { name: "Transport", limit: 60000 },
    { name: "Shopping", limit: 50000 }
    ]);

    return (
        <main className="main-content">
            <div className={styles.titleContent}>
                <Image src="/favicon.png" alt="logo" width={50} height={50}/>
                <h1 className={styles.titleText}>Budgets</h1>
            </div>

            <div>
                <ManageBudgetButton
                    onClick={() => {
                    setModalType("weekly");
                    setModalOpen(true);
                    }}
                />
                      
                <BudgetModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    weeklyData={weeklyBudgets}
                    monthlyData={monthlyBudgets}
                    onSaveWeekly={(data) => setWeeklyBudgets(data)}
                    onSaveMonthly={(data) => setMonthlyBudgets(data)}
                />
            </div>

            <Navbar/>

            <OverallBudgetHealth
                totalBudget={200000}
                spent={82000}
            />


            <div className={styles.summaryCards}>
                <BudgetSummaryCard
                    title="Weekly Budget"
                    subtitle="Track your spending this week"
                    categories={[
                        { name: "Food", spent: 14000, limit: 20000 },
                        { name: "Transport", spent: 5000, limit: 15000 },
                        { name: "Shopping", spent: 18000, limit: 20000 },
                    ]}
                />

                <BudgetSummaryCard
                    title="Monthly Budget"
                    subtitle="Track your spending this month"
                    categories={[
                        { name: "Food", spent: 31000, limit: 60000 },
                        { name: "Transport", spent: 31000, limit: 30000 },
                        { name: "Shopping", spent: 45000, limit: 50000 },
                    ]}
                />
            </div>

            <section className={styles.analyticsGrid}>
                <BudgetChartCard
                    category="Food"
                    spent={14000}
                    limit={20000}
                />

                <BudgetChartCard
                    category="Shopping"
                    spent={18000}
                    limit={20000}
                />

                <BudgetChartCard
                    category="Transport"
                    spent={5000}
                    limit={15000}
                />
            </section>
        </main>
    );
}