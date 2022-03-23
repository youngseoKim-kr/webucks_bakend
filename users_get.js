const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users_get = async (req, res) => {
  try {
    const selectUser = await prisma.$queryRaw`
        SELECT * FROM users;`;
    res.json(selectUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { users_get };
