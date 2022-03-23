const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSalt();

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }
    const selectUser = await prisma.$queryRaw`
        SELECT * FROM users WHERE email = ${email}`;

    //유저정보에 이메일 없음
    if (selectUser[0] == undefined) {
      const error = new Error("NOT_A_USER");
      error.statusCode = 404;
      throw error;
    }
    //비밀번호 체크
    const checkpw = bcrypt.compareSync(password, selectUser[0].password);

    console.log(checkpw);
    //if(true) -> Token 생성
    if (checkpw) {
      const user = { user_id: selectUser[0].id };
      const token = jwt.sign(user, process.env.SECRET);
      const user_info = jwt.verify(token, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ message: token });
    } else {
      const error = new Error("WRONG_PASSWORD");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { userLogin };
