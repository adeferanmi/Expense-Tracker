"use client";

import { useEffect, useState } from "react";
import styles from "./BudgetModal.module.css";

type Category = {
  id: number;
  category: string;
  budget: number;
  month: string;
};

type BudgetType = "weekly" | "monthly";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  weeklyData: Category[];
  monthlyData: Category[];

  onSaveWeekly: (data: Category[]) => void;
  onSaveMonthly: (data: Category[]) => void;
};

export default function BudgetModal({
  isOpen,
  onClose,
  weeklyData,
  monthlyData,
  onSaveWeekly,
  onSaveMonthly,
}: Props) {
  const [viewType, setViewType] = useState<BudgetType>("weekly");
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    if (viewType === "weekly") {
      setData(weeklyData);
    } else {
      setData(monthlyData);
    }
  }, [viewType, weeklyData, monthlyData, isOpen]);

  if (!isOpen) return null;

  const updateLimit = (index: number, value: number) => {
    const updated = [...data];
    updated[index].budget = value;
    setData(updated);
  };
  const handleSave = async () => {

    const token =
      localStorage.getItem("token");

    try {

      await Promise.all(

        data.map((budget) =>

          fetch(
            `http://localhost:5000/budgets/${budget.id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                category:
                  budget.category,

                limit:
                  budget.budget,

                month:
                  budget.month,
              }),
            }
          )

        )

      );

      onClose();

      window.location.reload();

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Edit Budgets</h2>

          <select
            value={viewType}
            onChange={(e) =>
              setViewType(e.target.value as BudgetType)
            }
            className={styles.dropdown}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <button
            className={styles.closeBtn}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.list}>
          {data.map((item, index) => (
            <div key={item.id} className={styles.row}>
              <span>{item.category}</span>

              <input
                type="number"
                value={item.budget}
                onChange={(e) =>
                  updateLimit(index, Number(e.target.value))
                }
              />
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}