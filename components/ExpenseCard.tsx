type ExpenseCardProps = {
  title: string;
  amount: number;
  category: string;
  date: string;
};

export default function ExpenseCard({
  title,
  amount,
  category,
  date,
}: ExpenseCardProps) {
  return (
    <div className="expense-card">
      <div>
        <h3>{title}</h3>
        <p>{category}</p>
      </div>

      <div className="expense-right">
        <h2>₦{amount}</h2>
        <small>{date}</small>
      </div>

      <div className="expense-actions">
        <button>Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
}