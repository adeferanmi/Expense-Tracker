const prisma = require("../prisma");

const createExpense = async (req, res, next) => {
  console.log(req.body);
  try {
    const { title, amount, category, date, isRecurring, recurringInterval, } = req.body;

    const userId = req.user.userId;

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category,
          createdAt: date
            ? new Date(date)
            : undefined,
        isRecurring,
        recurringInterval,

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log(expense.createdAt);

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
      limit = 100,
      sort = "desc",
      search,
      startDate,
      endDate,
    } = req.query;

    const userId = req.user.userId;

    const filters = {
      userId,
    };

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

    const userId = req.user.userId;

    const expense = await prisma.expense.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

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

    const userId = req.user.userId;

    const { title, amount, category, date } = req.body;

    const existingExpense =
      await prisma.expense.findFirst({
        where: {
          id: Number(id),
          userId,
        },
      });

    if (!existingExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    const updatedExpense =
      await prisma.expense.update({
        where: {
          id: Number(id),
        },

        data: {
          title,
          amount,
          category,
          createdAt: date
            ? new Date(date)
            : existingExpense.createdAt,
        },
      });

    res.json(updatedExpense);

  } catch (error) {
    next(error);
  }
};

const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user.userId;

    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(id),
        userId,
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

const getExpenseAnalytics = async (
  req,
  res,
  next
) => {
  try {

    const userId = req.user.userId;

    const expenses =
      await prisma.expense.findMany({
        where: {
          userId,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const recentTransactions =
      expenses
        .slice(0, 5)
        .map((expense) => ({
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          date: expense.createdAt,
        }));

    // OVERVIEW

    const totalExpenses =
      expenses.reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

    const totalTransactions =
      expenses.length;

    const highestExpense =
      expenses.length > 0
        ? Math.max(
            ...expenses.map(
              (expense) => expense.amount
            )
          )
        : 0;

    const averageExpense =
      totalTransactions > 0
        ? totalExpenses / totalTransactions
        : 0;

    // CATEGORY BREAKDOWN

    const categoryMap = {};

    expenses.forEach((expense) => {

      if (!categoryMap[expense.category]) {
        categoryMap[expense.category] = 0;
      }

      categoryMap[expense.category] += expense.amount;
    });

    const categoryBreakdown =
      Object.entries(categoryMap).map(
        ([category, amount]) => ({
          category,
          amount,
        })
      );

    // WEEKLY BREAKDOWN

    const weeklyMap = {};

    const oneWeekAgo = new Date();

    oneWeekAgo.setDate(
      oneWeekAgo.getDate() - 7
    );

    expenses.forEach((expense) => {

      const expenseDate =
        new Date(expense.createdAt);

      if (expenseDate >= oneWeekAgo) {

        const day =
          expenseDate.toLocaleString(
            "default",
            {
              weekday: "short",
            }
          );

        if (!weeklyMap[day]) {
          weeklyMap[day] = 0;
        }

        weeklyMap[day] += expense.amount;
      }
    });

    const weeklyBreakdown =
      Object.entries(weeklyMap).map(
        ([day, amount]) => ({
          day,
          amount,
        })
      );

    // MONTHLY BREAKDOWN
    
    const monthlyMap = {};

    expenses.forEach((expense) => {

      const month =
        new Date(expense.createdAt)
          .toLocaleString("default", {
            month: "long",
          });

      if (!monthlyMap[month]) {
        monthlyMap[month] = 0;
      }

      monthlyMap[month] += expense.amount;
    });

    const monthlyBreakdown =
      Object.entries(monthlyMap).map(
        ([month, amount]) => ({
          month,
          amount,
        })
      );

    res.json({

      overview: {
        totalExpenses,
        totalTransactions,
        highestExpense,
        averageExpense,
      },

      categoryBreakdown,

      weeklyBreakdown,

      monthlyBreakdown,

      recentTransactions,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseById,
  getExpenseAnalytics,
};