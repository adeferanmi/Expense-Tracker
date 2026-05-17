require("dotenv").config();

const express = require("express");
const prisma = require("./src/prisma");

const app = express();

app.use(express.json());

// test route
app.get("/test", async (req, res) => {
  const expenses = await prisma.expense.findMany();
  res.json(expenses);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});