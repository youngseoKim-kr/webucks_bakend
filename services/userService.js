const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UNSAFE_NavigationContext } = require("react-router-dom");

const findUser = async (id) => {
  const findUser = await userDao.findUser(id);

  return findUser;
};

const signUp = async (email, password) => {
  // 비밀번호가 짧을 때
  if (password.length < 8) {
    const error = new Error("PASSWORD_TOO_SHORT");
    error.statusCode = 400;
    throw error;
  }

  const selectUser = await userDao.getUserByEmail(email, password);

  for (let i in selectUser) {
    if (selectUser[i].email == email) {
      const error = new Error("EXISTING_USER");
      error.statusCode = 409;
      throw error;
    }
  }

  //hash 이용해서 비번 암호화
  const hashedPassword = bcrypt.hashSync(password, 10);
  //   const hashedPassword = bcrypt.hashSync(password, bcrypt.genSalt());
  console.log(hashedPassword);
  const newUser = await userDao.createUser(email, hashedPassword);

  return newUser;
};

const login = async (email, password) => {
  const selectUser = await userDao.selectUser(email, password);

  if (selectUser[0] == undefined) {
    const error = new Error("client input invalid");
    error.statusCode = 400;
    throw error;
  }
  //비밀번호 체크
  const checkpw = bcrypt.compareSync(password, selectUser[0].password);

  //if(true) -> Token 생성
  if (checkpw) {
    const user = { user_id: selectUser[0].id };
    const token = jwt.sign(user, process.env.SECRET);
    // const user_info = jwt.verify(token, process.env.SECRET, {
    //   expiresIn: "1h",
    // });
    return token;
  } else {
    const error = new Error("client input invalid");
    error.statusCode = 400;
    throw error;
  }
};

const remove = async (email) => {
  const selectUser = await userDao.selectUser(email);
  if (selectUser[0] == undefined) {
    const error = new Error("NOT_A_USER");
    error.statusCode = 404;
    throw error;
  }
  const removeUser = await userDao.deleteUser(email);
  return removeUser;
};

const get = async () => {
  const getUser = await userDao.getUser();
  return getUser;
};

const put = async (email, password) => {
  const selectUser = await userDao.selectUser(email, password);
  if (selectUser[0] == undefined) {
    const error = new Error("NOT_A_USER");
    error.statusCode = 404;
    throw error;
  }
  //비밀번호 짧으면 불가능
  if (password.length < 8) {
    const error = new Error("PASSWORD_TOO_SHORT");
    error.statusCode = 400;
    throw error;
  }

  //비밀번호 암호화
  const hashedPassword = bcrypt.hashSync(password, 10);
  const updateUser = await userDao.updateUser(email, hashedPassword);
  return updateUser;
};

const Verification = async (token) => {
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      const error = new Error("잘못된 토큰");
      error.statusCode = 400;
      throw error;
    }
    if (decoded) {
      user_info = jwt.verify(token, process.env.SECRET);
    }
  });
  const selectUser = userDao.selectUser_2(user_info);
  return selectUser;
};

module.exports = { signUp, login, remove, get, put, Verification, findUser };
