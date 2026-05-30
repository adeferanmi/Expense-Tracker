"use client";

import TransactionItem from "./TransactionItem";
import styles from "./RecentTransactions.module.css";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

type Transaction = {
  title: string;
  amount: number;
  category: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
};

export default function RecentTransactions({
  transactions,
}: Props) {
  return (
    <div className={styles.transactionsCard}>
      <div className={styles.header}>
        <h2>Recent Transactions</h2>

        <Link href={"/update-expenses"} className={styles.viewAllLink}>
          <button className={styles.viewAllButton}>
          View All
          <FaArrowRight />
        </button>
        </Link>

      </div>

      <div className={styles.transactionList}>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            title={transaction.title}
            amount={transaction.amount}
            category={transaction.category}
            date={transaction.date}
          />
        ))}
      </div>
    </div>
  );
}