const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();

const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email : ", email, "\n", "name : ", password);
    if (email === undefined || password === undefined) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    // 비밀번호가 짧을 때
    if (password.length < 8) {
      return res.status(400).json({ message: "PASSWORD_TOO_SHORT" });
    }
    //이미 가입했는지 확인 //CUSTOM_ERROR
    const selectUser = await prisma.$queryRaw`
        SELECT email FROM users`;

    for (let i in selectUser) {
      if (selectUser[i].email == email) {
        return res.status(409).json({ message: "EXSITING_USER" });
      }
    }
    //hash 이용해서 비번 암호화
    const makeHash = async (password) => {
      return await bcrypt.hash(password, salt);
    };

    const hashedPassword = await makeHash(password);

    // const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await prisma.$queryRaw`
        INSERT INTO users(email, password) VALUES (${email}, ${hashedPassword});`;
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { userSignup };
