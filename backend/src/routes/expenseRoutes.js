const express = require("express");
const validateExpense = require("../middleware/validateExpense");

const {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseSummary,
  getCategorySummary,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", validateExpense, createExpense);
router.get("/", getExpenses);
router.get("/summary", getExpenseSummary);
router.get("/category-summary", getCategorySummary);
router.delete("/:id", deleteExpense); //browser cannot directly delete expense, this will be called from frontend when user clicks delete button, so we can comment this out for now

//router.get("/delete/:id", deleteExpense); //for testing on browser

router.put("/:id", validateExpense, updateExpense);

//router.get("/update/:id", updateExpense); //for testing on browser

module.exports = router;