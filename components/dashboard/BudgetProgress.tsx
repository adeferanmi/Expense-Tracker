"use client";

import styles from "./BudgetProgress.module.css";

interface BudgetProgressProps {
  budgets: any[];
}

export default function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Budget Progress</h2>

      <div className={styles.list}>
        {budgets.map((item) => {
          const percent = (item.spent / item.budget) * 100;

          let status = "safe";
          if (percent >= 100) status = "over";
          else if (percent >= 80) status = "warning";

          return (
            <div key={item.category} className={styles.item}>
              <div className={styles.row}>
                <span className={styles.category}>{item.category}</span>

                <span className={styles.amount}>
                  ₦{item.spent.toLocaleString()} / ₦
                  {item.budget.toLocaleString()}
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