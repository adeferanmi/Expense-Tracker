const express = require("express");

const {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", createExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense); //browser cannot directly delete expense, this will be called from frontend when user clicks delete button, so we can comment this out for now

//router.get("/delete/:id", deleteExpense); //for testing on browser

router.put("/:id", updateExpense);

//router.get("/update/:id", updateExpense); //for testing on browser

module.exports = router;