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

    const {
      category,
      minAmount,
      page = 1,
      limit = 5,
      sort = "desc",
      search,
      startDate,
      endDate,
    } = req.query;

    const filters = {};

    if (category) {
      filters.category = category;
    }

    if (minAmount) {
      filters.amount = {
        gte: Number(minAmount),
      };
    }

    if (search) {
      filters.title = {
      contains: search,
      mode: "insensitive",
      };
    }

    if (startDate || endDate) {

      filters.createdAt = {};

      if (startDate) {
        filters.createdAt.gte = new Date(startDate);
      }

      if (endDate) {
        filters.createdAt.lte = new Date(endDate);
      }
    }

    const expenses = await prisma.expense.findMany({
      where: filters,

      orderBy: {
        createdAt: sort,
      },

      skip: (Number(page) - 1) * Number(limit),

      take: Number(limit),
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

const getMonthlySummary = async (req, res, next) => {
  try {

    const expenses = await prisma.expense.findMany();

    const monthlyTotals = {};

    expenses.forEach((expense) => {

      const date = new Date(expense.createdAt);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (monthlyTotals[monthKey]) {
        monthlyTotals[monthKey] += expense.amount;
      } else {
        monthlyTotals[monthKey] = expense.amount;
      }
    });

    const formattedSummary = Object.keys(monthlyTotals).map(
      (month) => ({
        month,
        total: monthlyTotals[month],
      })
    );

    res.json(formattedSummary);

  } catch (error) {
    next(error);
  }
};

const getExpenseStats = async (req, res, next) => {
  try {

    const expenses = await prisma.expense.findMany();

    if (expenses.length === 0) {
      return res.json({
        totalExpenses: 0,
        averageExpense: 0,
        highestExpense: 0,
        lowestExpense: 0,
        totalTransactions: 0,
      });
    }

    const amounts = expenses.map((expense) => expense.amount);

    const totalExpenses = amounts.reduce(
      (sum, amount) => sum + amount,
      0
    );

    const averageExpense =
      totalExpenses / amounts.length;

    const highestExpense = Math.max(...amounts);

    const lowestExpense = Math.min(...amounts);

    res.json({
      totalExpenses,
      averageExpense,
      highestExpense,
      lowestExpense,
      totalTransactions: expenses.length,
    });

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
  getMonthlySummary,
  getExpenseStats,
  getExpenseById,
};