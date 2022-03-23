const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users_put = async (req, res) => {
  try {
    const { email, password } = req.body;

    const selectUser = await prisma.$queryRaw`
        SELECT email FROM users`;
    let k = 0;
    for (let i in selectUser) {
      if (selectUser[i].email == email) {
        k = 1;
      }
    }
    if (k == 0) {
      return res.status(409).json({ message: "EXSITING_USER" });
    }

    const updateUser = await prisma.$queryRaw`
        UPDATE users SET email = ${email} ,password = ${password} WHERE email = ${email}
        `;

    return res.status(201).json({ message: "UPDATE" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { users_put };
