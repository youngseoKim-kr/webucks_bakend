const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const product_s = async (req, res) => {
  const selectproduct = await prisma.$queryRaw`
    SELECT *  FROM products;`;

  res.json(selectproduct);
};

module.exports = { product_s };
