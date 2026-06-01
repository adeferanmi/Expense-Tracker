import styles from "./SummaryCard.module.css";

interface SummaryCardProps {
  title: string;
  amount: string;
  subtitle?: string;
  icon: string;
}

export default function SummaryCard({
  title,
  amount,
  subtitle,
  icon,
}: SummaryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.icon}>{icon}</span>
        <p className={styles.title}>{title}</p>
      </div>

      <h2 className={styles.amount}>{amount}</h2>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}