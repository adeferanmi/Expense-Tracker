import styles from "./ExpenseCard.module.css";

import {
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaFileInvoiceDollar,
  FaWallet,
  FaPen,
  FaTrash,
} from "react-icons/fa";

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

type Props = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}: Props) {
  const getCategoryIcon = () => {
    switch (expense.category) {
      case "Food":
        return <FaUtensils />;
      case "Transport":
        return <FaCar />;
      case "Shopping":
        return <FaShoppingBag />;
      case "Bills":
        return <FaFileInvoiceDollar />;
      default:
        return <FaWallet />;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.categoryRow}>
        <span className={styles.icon}>{getCategoryIcon()}</span>
        <span className={styles.category}>{expense.category}</span>
      </div>

      <h3 className={styles.title}>{expense.title}</h3>

      <p className={styles.amount}>
        ₦{expense.amount.toLocaleString()}
      </p>

      <p className={styles.date}>
        {new Date(expense.date).toLocaleDateString()}
      </p>

      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${styles.editBtn}`}
          onClick={() => onEdit(expense)}
          aria-label="Edit expense"
        >
          <FaPen />
        </button>

        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(expense.id)}
          aria-label="Delete expense"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}