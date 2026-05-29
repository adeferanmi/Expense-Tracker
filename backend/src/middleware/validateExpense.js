const validateExpense = (req, res, next) => {
  const { title, amount, category } = req.body;

  if (!title || !amount || !category) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (typeof amount !== "number") {
    return res.status(400).json({
      message: "Amount must be a number",
    });
  }

  next();
};

module.exports = validateExpense;