const prisma = require("../prisma");

const createBudget = async (req, res, next) => {
  try {

    const { category, limit, month } = req.body;

    const userId = req.user.userId;

    const budget = await prisma.budget.create({
      data: {
        category,
        limit,
        month,

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json(budget);

  } catch (error) {
    next(error);
  }
};

const getBudgetOverview = async (req, res, next) => {
  try {

    const userId = req.user.userId;

    const budgets = await prisma.budget.findMany({
      where: {
        userId,
      },
    });

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
    });

    const overview = budgets.map((budget) => {

      const spent = expenses
        .filter(
          (expense) =>
            expense.category === budget.category
        )

        .reduce(
          (sum, expense) =>
            sum + expense.amount,
          0
        );

      const remaining = budget.limit - spent;

      return {
        category: budget.category,

        budget: budget.limit,

        spent,

        remaining,

        status:
          remaining < 0
            ? "OVER_BUDGET"
            : "SAFE",
      };
    });

    res.json(overview);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBudget,
  getBudgetOverview,
};