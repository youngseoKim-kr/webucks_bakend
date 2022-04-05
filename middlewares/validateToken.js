const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(400).json({ message: "WRONG_TOKEN" });
      }
      if (decoded) {
        user_info = jwt.verify(token, process.env.SECRET);
      }
    });

    const foundUser = await UserService.findUser(user_info.user_id);

    if (!foundUser) {
      // 이 토큰을 가진 유저가 데이터베이스에 없으면 404 에러를 냅니다.
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }

    req.foundUser = foundUser; // request 객체에 새로운 키값에 찾아진 유저의 정보를 할당하고
    next(); // next() 함수로 다음 미들웨어로 맥락(context)를 연결합니다.
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateToken,
};
