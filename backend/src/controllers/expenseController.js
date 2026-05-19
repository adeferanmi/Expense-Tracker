const prisma = require("../prisma");

const createExpense = async (req, res, next) => {
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
    next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {

    const { category, minAmount } = req.query;

    const filters = {};

    if (category) {
      filters.category = category;
    }

    if (minAmount) {
      filters.amount = {
        gte: Number(minAmount),
      };
    }

    const expenses = await prisma.expense.findMany({
      where: filters,

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(expenses);

  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
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
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
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
    next(error);
  }
};

const getExpenseSummary = async (req, res, next) => {
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
    next(error);
  }
};

const getCategorySummary = async (req, res, next) => {
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
    next(error);
  }
};

const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseSummary,
  getCategorySummary,
  getExpenseById,
};