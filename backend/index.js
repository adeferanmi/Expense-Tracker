require("dotenv").config();

const express = require("express");
const prisma = require("./src/prisma");

const app = express();

app.use(express.json());

// test route
app.get("/test", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});