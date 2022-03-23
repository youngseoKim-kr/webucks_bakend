const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = async (req, res) => {
  const selectcategories = await prisma.$queryRaw`
    SELECT *  FROM categories;`;

  res.json(selectcategories);
};

module.exports = { categories };
