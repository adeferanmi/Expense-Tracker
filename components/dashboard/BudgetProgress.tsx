"use client";

import styles from "./BudgetProgress.module.css";

const budgets = [
  { category: "Food", used: 80000, total: 100000 },
  { category: "Transport", used: 30000, total: 60000 },
  { category: "Shopping", used: 145000, total: 150000 },
];

export default function BudgetProgress() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Budget Progress</h2>

      <div className={styles.list}>
        {budgets.map((item) => {
          const percent = (item.used / item.total) * 100;

          let status = "safe";
          if (percent >= 100) status = "over";
          else if (percent >= 80) status = "warning";

          return (
            <div key={item.category} className={styles.item}>
              <div className={styles.row}>
                <span className={styles.category}>{item.category}</span>

                <span className={styles.amount}>
                  ₦{item.used.toLocaleString()} / ₦
                  {item.total.toLocaleString()}
                </span>
              </div>

              <div className={styles.barBackground}>
                <div
                  className={`${styles.barFill} ${styles[status]}`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                />
              </div>

              <span className={styles.percentLabel}>
                {Math.round(percent)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}