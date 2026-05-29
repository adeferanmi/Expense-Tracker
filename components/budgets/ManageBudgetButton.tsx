type Props = {
  onClick: () => void;
};

export default function ManageBudgetButton({ onClick }: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "right" }}>
      <button
        onClick={onClick}
        style={{
          padding: "0.9rem 1.4rem",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "white",
          background: "linear-gradient(135deg, #db2777, #ec4899)",
          boxShadow: "0 10px 20px rgba(219, 39, 119, 0.25)",
          transition: "0.2s ease",

          marginBottom: "20px",
        }}
      >
        ⚙ Manage Budgets
      </button>
    </div>
  );
}