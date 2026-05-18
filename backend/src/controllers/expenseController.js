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

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.expense.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, amount, category } = req.body;

    /* 
    const title = "Updated Expense";
    const amount = 12000;
    const category = "Updated Category";
    */

    const updatedExpense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        amount,
        category,
      },
    });

    res.json(updatedExpense);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update expense",
    });
  }
};

const getExpenseSummary = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();

    const totalExpenses = expenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    res.json({
      totalExpenses,
      totalTransactions: expenses.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expense summary",
    });
  }
};

const getCategorySummary = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();

    const categoryTotals = {};

    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    const formattedSummary = Object.keys(categoryTotals).map(
      (category) => ({
        category,
        total: categoryTotals[category],
      })
    );

    res.json(formattedSummary);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch category summary",
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseSummary,
  getCategorySummary,
};