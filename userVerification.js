const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userVerification = async (req, res) => {
  try {
    const { token } = req.headers;
    jwt.verify(token, "my_scret_key", (error, decoded) => {
      if (error) {
        const error = new Error("잘못된 토큰");
        error.statusCode = 400;
        throw error;
      }
      if (decoded) {
        user_info = jwt.verify(token, "my_scret_key");
      }
    });
    console.log(user_info);
    const selectusers = await prisma.$queryRaw`
        SELECT id, email, username , address, phone_number ,
        policy_agreed FROM users WHERE  id = ${user_info.user_id};`;
    res.json(selectusers);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { userVerification };
