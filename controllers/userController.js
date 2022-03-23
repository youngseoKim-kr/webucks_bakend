const userService = require("../services/userService");

// 아래 정의된 함수는 지난 수업시간에 다룬 내용 입니다.
const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const user = await userService.signUp(email, password);
    console.log(user);
    res.status(201).json({
      message: "SIGNUP_SUCESS",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }
    const token = await userService.login(email, password);

    res.status(201).json({
      message: "LOGIN_SUCESS",
      token,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (email === undefined) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const removeUser = await userService.remove(email);

    res.status(201).json({
      message: "DELETE_SUCESS",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const get = async (req, res, next) => {
  try {
    const getUser = await userService.get();
    res.status(201).json({
      getUser,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const put = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const putUser = await userService.put(email, password);
    res.status(201).json({
      message: "UPDATE_SUCESS",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const verification = async (req, res, next) => {
  try {
    const { token } = req.headers;

    const user_info = await userService.Verification(token);

    res.status(201).json({
      user_info,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  login,
  remove,
  get,
  put,
  verification,
};
