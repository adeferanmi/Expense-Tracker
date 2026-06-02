import "./OverallBudgetHealth.css";

type OverallBudgetHealthProps = {
  totalBudget: number;
  spent: number;
};

const OverallBudgetHealth = ({
  totalBudget,
  spent,
}: OverallBudgetHealthProps) => {
  const remaining = totalBudget - spent;

  const percentage = Math.min(
    Math.round((spent / totalBudget) * 100),
    100
  );

  const getStatus = () => {
    if (percentage < 50) return "SAFE";
    if (percentage < 80) return "CAUTION";
    if (percentage < 100) return "NEAR LIMIT";

    return "EXCEEDED";
  };

  const status = getStatus();

  return (
    <section className="overallBudgetHealth">
      <div className="healthHeader">
        <div>
          <h2>Overall Budget Health</h2>
          <p className="healthMessage">
            You're doing well this month 🎉
          </p>
        </div>

        <div
          className={`statusBadge ${status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {status}
        </div>
      </div>

      <div className="budgetStats">
        <div className="statCard">
          <span>Total Budget</span>
          <h3>₦{totalBudget.toLocaleString()}</h3>
        </div>

        <div className="statCard">
          <span>Spent So Far</span>
          <h3>₦{spent.toLocaleString()}</h3>
        </div>

        <div className="statCard">
          <span>Remaining</span>
          <h3>₦{remaining.toLocaleString()}</h3>
        </div>
      </div>

      <div className="progressSection">
        <div className="progressInfo">
          <span>Overall Progress </span>
          <span>{percentage}%</span>
        </div>

        <div className="progressBar">
          <div
            className={`progressFill ${status
              .toLowerCase()
              .replace(" ", "-")}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default OverallBudgetHealth;