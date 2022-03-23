const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { useResolvedPath } = require("react-router-dom");
const res = require("express/lib/response");

const routes = require("./routes");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(routes);
app.get("/", (req, res) => {
  res.json({ message: "/endpoint" });
});

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () => console.log(`Server is listiening on 8000`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();
