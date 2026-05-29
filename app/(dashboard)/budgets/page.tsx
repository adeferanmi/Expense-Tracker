"use client";
import Navbar from "@/components/Navbar";
import OverallBudgetHealth from "@/components/budgets/OverallBudgetHealth";
import BudgetSummaryCard from "@/components/budgets/BudgetSummaryCard";

export default function Budgets(){
    return (
        <main className="main-content">
            <h2>Budgets</h2>

            <Navbar/>

            <OverallBudgetHealth
                totalBudget={200000}
                spent={82000}
            />

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
        </main>
    );
}