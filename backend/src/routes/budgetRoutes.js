const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBudget,
} = require("../controllers/budgetController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createBudget);

module.exports = router;