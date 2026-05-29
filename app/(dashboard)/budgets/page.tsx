"use client";
import Navbar from "@/components/Navbar";
import OverallBudgetHealth from "@/components/budgets/OverallBudgetHealth";
import styles from "./overallbudgethealth.module.css"

export default function Budgets(){
    return (
        <main className="main-content">
            <h2>Budgets</h2>

            <Navbar/>

            <OverallBudgetHealth
                totalBudget={200000}
                spent={82000}
            />
        </main>
    );
}