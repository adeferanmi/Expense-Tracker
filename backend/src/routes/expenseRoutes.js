const express = require("express");

const {
  createExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", createExpense);

module.exports = router;