import SummaryCard from "./SummaryCard";
import styles from "./SummaryCards.module.css";

export default function SummaryCards() {
  return (
    <section className={styles.summarySection}>
      <SummaryCard
        icon="💸"
        title="Total Expenses"
        amount="₦145,000"
        subtitle="↑ 12% this month"
      />

      <SummaryCard
        icon="💰"
        title="Monthly Budget"
        amount="₦250,000"
        subtitle="58% used"
      />

      <SummaryCard
        icon="📊"
        title="Remaining"
        amount="₦105,000"
        subtitle="On track"
      />
    </section>
  );
}