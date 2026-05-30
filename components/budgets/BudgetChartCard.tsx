"use client";

import styles from "./BudgetChartCard.module.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaGamepad,
  FaBolt,
} from "react-icons/fa";

type Props = {
  category: string;
  spent: number;
  limit: number;
};

export default function BudgetChartCard({
  category,
  spent,
  limit,
}: Props) {
  const remaining = Math.max(limit - spent, 0);

  const percentage = Math.min(
    Math.round((spent / limit) * 100),
    100
  );

  const data = [
    { name: "Spent", value: spent },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#db2777", "#fbcfe8"];

  const getStatus = () => {
    if (percentage < 50) return "safe";
    if (percentage < 80) return "caution";
    if (percentage < 100) return "nearLimit";

    return "exceeded";
  };

  const status = getStatus();

  const getMessage = () => {
    if (status === "safe") {
      return "You're managing this category well ✨";
    }

    if (status === "caution") {
      return "Spending is increasing steadily";
    }

    if (status === "nearLimit") {
      return "Approaching your spending limit";
    }

    return "Budget exceeded";
  };

  const getIcon = () => {
    switch (category.toLowerCase()) {
      case "food":
        return <FaUtensils />;

      case "transport":
        return <FaCar />;

      case "shopping":
        return <FaShoppingBag />;

      case "entertainment":
        return <FaGamepad />;

      default:
        return <FaBolt />;
    }
  };

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.header}>
        <div className={styles.category}>
          <div className={styles.icon}>
            {getIcon()}
          </div>

          <h2>{category}</h2>
        </div>

        <div className={`${styles.badge} ${styles[status]}`}>
          {status
            .replace(/([A-Z])/g, " $1")
            .toUpperCase()}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={78}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.centerText}>
          <h3>{percentage}%</h3>
          <span>spent</span>
        </div>
      </div>

      <div className={styles.legend}>
        <div>
          <span className={styles.spentDot}></span>
          Spent
        </div>

        <div>
          <span className={styles.remainingDot}></span>
          Remaining
        </div>
      </div>

      <div className={styles.info}>
        <p>
          ₦{spent.toLocaleString()} of ₦
          {limit.toLocaleString()}
        </p>

        <h4>
          ₦{remaining.toLocaleString()} remaining
        </h4>

        <span>
          {100 - percentage}% available
        </span>
      </div>

      <div className={styles.trend}>
        ↑ 12% more than last week
      </div>

      <div className={styles.message}>
        {getMessage()}
      </div>
    </div>
  );
}