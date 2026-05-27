require("dotenv").config();

const express = require("express");

const prisma = require("./src/prisma");

const expenseRoutes = require("./src/routes/expenseRoutes");

const errorHandler = require("./src/middleware/errorHandler");

const authRoutes = require("./src/routes/authRoutes");

const budgetRoutes = require("./src/routes/budgetRoutes");

const app = express();

app.use(express.json());
app.use("/expenses", expenseRoutes);
app.use("/budgets", budgetRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

// test route
app.get("/test", async (req, res) => {
  const expenses = await prisma.expense.findMany();
  res.json(expenses);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});