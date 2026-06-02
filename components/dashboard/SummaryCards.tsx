import SummaryCard from "./SummaryCard";
import styles from "./SummaryCards.module.css";

interface SummaryCardsProps {
  analytics: any;
  budgetOverview: any[];
}

export default function SummaryCards({analytics, budgetOverview}: SummaryCardsProps) {
  const totalBudget =
    budgetOverview.reduce(
      (sum, budget) =>
        sum + budget.budget,
      0
    );

  const totalRemaining =
    budgetOverview.reduce(
      (sum, budget) =>
        sum + budget.remaining,
      0
    );

  const totalSpent =
    analytics?.overview?.totalExpenses ?? 0;

  const budgetUsedPercentage =
    totalBudget > 0
      ? Math.round(
          (totalSpent / totalBudget) * 100
        )
      : 0;
  return (
    <section className={styles.summarySection}>
      <SummaryCard
        icon="💸"
        title="Total Expenses"
        amount={`₦${
          analytics?.overview?.totalExpenses ?? 0
        }`}
        subtitle={`${analytics?.overview?.totalTransactions ?? 0} transactions`}
      />

      <SummaryCard
        icon="💰"
        title="Monthly Budget"
        amount={`₦${totalBudget}`}
        subtitle={`${budgetUsedPercentage}% used`}
      />

      <SummaryCard
        icon="📊"
        title="Remaining"
        amount={`₦${totalRemaining}`}
        subtitle={
          totalRemaining >= 0
            ? "On track"
            : "Over budget"
        }
      />
    </section>
  );
}