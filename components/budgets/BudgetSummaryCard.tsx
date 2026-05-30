import styles from "./BudgetSummaryCard.module.css"

type Category = {
  name: string;
  spent: number;
  limit: number;
};

type Props = {
  title: string;
  subtitle?: string;
  categories: Category[];
};

const getPercentage = (spent: number, limit: number) => {
  return Math.min(Math.round((spent / limit) * 100), 100);
};

const getStatus = (percentage: number) => {
  if (percentage < 50) return "safe";
  if (percentage < 80) return "caution";
  if (percentage < 100) return "nearLimit";
  return "exceeded";
};

export default function BudgetSummaryCard({
  title,
  subtitle,
  categories,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className={styles.list}>
        {categories.map((cat) => {
          const percentage = getPercentage(cat.spent, cat.limit);
          const status = getStatus(percentage);

          return (
            <div key={cat.name} className={styles.item}>
              <div className={styles.topRow}>
                <span className={styles.name}>{cat.name}</span>

                <span className={`${styles.badge} ${styles[status]}`}>
                  {status.toUpperCase().replace(/([A-Z])/g, " $1")}
                </span>
              </div>

              <div className={styles.amount}>
                ₦{cat.spent.toLocaleString()} / ₦{cat.limit.toLocaleString()}
              </div>

              <div className={styles.bar}>
                <div
                  className={`${styles.fill} ${styles[status]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}