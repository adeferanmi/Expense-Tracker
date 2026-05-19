const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBudget,
  getBudgetOverview,
} = require("../controllers/budgetController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createBudget);

router.get("/overview", getBudgetOverview);

module.exports = router;