const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBudget,
  getBudgets,
  getBudgetOverview,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createBudget);

router.get("/", getBudgets);

router.get("/overview", getBudgetOverview);

router.put("/:id", updateBudget);

router.delete("/:id", deleteBudget);

module.exports = router;