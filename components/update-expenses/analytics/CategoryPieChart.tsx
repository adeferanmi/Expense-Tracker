"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styles from "./SpendingLineChart.module.css";

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = ["#db2777", "#f472b6", "#f9a8d4", "#be185d"];

export default function CategoryPieChart({ data }: Props) {
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Spending by Category</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={85}
            innerRadius={55}   // 👈 makes it a donut (more modern)
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* ALWAYS visible labels (fixes your issue) */}
          <Legend />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}