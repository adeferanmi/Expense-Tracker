const prisma = require("../prisma");

const createExpense = async (req, res) => {
  try {
    const title = "Transport";
    const amount = 5000;
    const category = "Travel";

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create expense",
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(expenses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
};