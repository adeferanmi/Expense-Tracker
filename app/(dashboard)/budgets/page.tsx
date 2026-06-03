"use client";
import { useEffect, useState } from "react";
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

    const [budgets, setBudgets] = useState<any[]>([]);

    const fetchBudgets = async () => {

        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/budgets/overview`,
            {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            }
        );

        const data = await res.json();

        setBudgets(data);
    }

    useEffect(() => {
        fetchBudgets();
    }, []);

    console.log("BUDGETS", budgets);

    const handleBudgetSave = async (data: any[]) => {
        const token = localStorage.getItem("token");

        await Promise.all(
            data.map((budget) =>
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/budgets/${budget.id}`,
                {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    category: budget.category,
                    limit: budget.budget,
                    month: budget.month,
                }),
                }
            )
            )
        );

        fetchBudgets();
        };

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
                    weeklyData={budgets}
                    monthlyData={budgets}
                    onSaveWeekly={handleBudgetSave}
                    onSaveMonthly={handleBudgetSave}
                />
            </div>

            <Navbar/>

            <OverallBudgetHealth
                totalBudget={
                    budgets.reduce(
                        (sum, budget) =>
                            sum + budget.budget,
                        0
                    )
                }
                spent={
                    budgets.reduce(
                        (sum, budget) =>
                            sum + budget.spent,
                        0
                    )
                }
            />


            <div className={styles.summaryCards}>
                <BudgetSummaryCard
                    title="Weekly Budget"
                    subtitle="Track your spending this week"
                    categories={budgets.map((budget) => ({
                        name: budget.category,
                        spent: budget.spent,
                        limit: budget.budget,
                    }))}
                />

                <BudgetSummaryCard
                    title="Monthly Budget"
                    subtitle="Track your spending this month"
                    categories={budgets.map((budget) => ({
                        name: budget.category,
                        spent: budget.spent,
                        limit: budget.budget,
                    }))}
                />
            </div>

            <section className={styles.analyticsGrid}>
                {budgets.map((budget) => (

                    <BudgetChartCard
                        key={budget.id}
                        category={budget.category}
                        spent={budget.spent}
                        limit={budget.budget}
                    />

                ))}
            </section>
        </main>
    );
}