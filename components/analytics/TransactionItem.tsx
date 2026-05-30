"use client";

import {
  FaUtensils,
  FaShoppingBag,
  FaCarSide,
} from "react-icons/fa";

import styles from "./TransactionItem.module.css";

type Props = {
  title: string;
  amount: number;
  category: string;
  date: string;
};

export default function TransactionItem({
  title,
  amount,
  category,
  date,
}: Props) {
  const getIcon = () => {
    switch (category.toLowerCase()) {
      case "food":
        return <FaUtensils />;
      case "shopping":
        return <FaShoppingBag />;
      case "transport":
        return <FaCarSide />;
      default:
        return <FaShoppingBag />;
    }
  };

  return (
    <div className={styles.transactionItem}>
      <div className={styles.leftSection}>
        <div
          className={`${styles.iconContainer} ${
            styles[category.toLowerCase()]
          }`}
        >
          {getIcon()}
        </div>

        <div className={styles.textSection}>
          <h4>{title}</h4>
          <p>
            {category} • {date}
          </p>
        </div>
      </div>

      <span className={styles.amount}>
        ₦{amount.toLocaleString()}
      </span>
    </div>
  );
}