"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./SpendingLineChart.module.css";

type Props = {
  data: { date: string; amount: number }[];
};

export default function SpendingLineChart({ data }: Props) {
  return (
    <div className={styles.chartCard}>
      <h2 className={styles.chartTitle}>Expenses Over Time</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#db2777"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}