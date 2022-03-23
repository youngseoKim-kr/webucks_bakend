const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRemove = async (req, res) => {
  try {
    const { email } = req.body;
    const deleteUser = await prisma.$queryRaw`
          DELETE FROM users WHERE email=${email};
          `;

    return res.status(201).json({ message: "DELETE" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { userRemove };
