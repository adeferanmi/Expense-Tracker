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

const getBudgets = async (req, res, next) => {
  try {

    const budgets =
      await prisma.budget.findMany({
        where: {
          userId: req.user.userId,
        },
      });

    res.json(budgets);

  } catch (error) {
    next(error);
  }
};

const getBudgetOverview = async (req, res, next) => {
  try {

    const userId = req.user.userId;

    let budgets = await prisma.budget.findMany({
      where: {
        userId,
      },
    });

    if (budgets.length === 0) {

      await prisma.budget.createMany({
        data: [
          {
            category: "Food",
            limit: 0,
            month: "Current",
            userId,
          },
          {
            category: "Transport",
            limit: 0,
            month: "Current",
            userId,
          },
          {
            category: "Shopping",
            limit: 0,
            month: "Current",
            userId,
          },
        ],
      });

      budgets = await prisma.budget.findMany({
        where: {
          userId,
        },
      });
    }

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

      let status = "SAFE";

      if (spent >= budget.limit) {
        status = "OVER_BUDGET";
      }
      else if (spent >= budget.limit * 0.8) {
        status = "NEAR_LIMIT";
      }
      else if (spent >= budget.limit * 0.5) {
        status = "CAUTION";
      }

      return {
        id: budget.id,
        category: budget.category,
        budget: budget.limit,
        spent,
        remaining,
        status,
        month: budget.month,
      };
    });

    res.json(overview);

  } catch (error) {
    next(error);
  }
};

const updateBudget = async (req, res, next) => {
  try {

    const { id } = req.params;

    const budget = await prisma.budget.update({
      where: {
        id: Number(id),
      },

      data: req.body,
    });

    res.json(budget);

  } catch (error) {
    next(error);
  }
};

const deleteBudget = async (req, res, next) => {
  try {

    const { id } = req.params;

    await prisma.budget.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Budget deleted",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudgetOverview,
  updateBudget,
  deleteBudget,
};