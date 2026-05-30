"use client";

import { useEffect, useState } from "react";
import styles from "./BudgetModal.module.css";

type Category = {
  name: string;
  limit: number;
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

  // Load correct data when type changes OR modal opens
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
    updated[index].limit = value;
    setData(updated);
  };

  const handleSave = () => {
    if (viewType === "weekly") {
      onSaveWeekly(data);
    } else {
      onSaveMonthly(data);
    }

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Edit Budgets</h2>

          {/* DROPDOWN */}
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

        {/* LIST */}
        <div className={styles.list}>
          {data.map((item, index) => (
            <div key={item.name} className={styles.row}>
              <span>{item.name}</span>

              <input
                type="number"
                value={item.limit}
                onChange={(e) =>
                  updateLimit(index, Number(e.target.value))
                }
              />
            </div>
          ))}
        </div>

        {/* ACTIONS */}
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