const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  //이미 가입했는지 확인 //CUSTOM_ERROR
  const selectUser = await prisma.$queryRaw`
      SELECT email FROM users`;

  return selectUser;
};

const createUser = async (email, hashedPassword) => {
  return await prisma.$queryRaw`
        INSERT INTO users(email, password) VALUES (${email}, ${hashedPassword});`;
};

const selectUser = async (email) => {
  const selectUser = await prisma.$queryRaw`
    SELECT * FROM users WHERE email = ${email}`;

  return selectUser;
};

const deleteUser = async (email) => {
  const deleteUser = await prisma.$queryRaw`
    DELETE FROM users WHERE email=${email};
    `;

  return deleteUser;
};

const getUser = async (email) => {
  const selectUser = await prisma.$queryRaw`
    SELECT users.id, users.email, users.username, users.address FROM users;`;

  return selectUser;
};

const updateUser = async (email, password) => {
  const updateUser = await prisma.$queryRaw`
    UPDATE users SET email = ${email} ,password = ${password} WHERE email = ${email}
    `;
  return updateUser;
};

const selectUser_2 = async (user_info) => {
  const selectusers = await prisma.$queryRaw`
        SELECT id, email, username , address, phone_number ,
        policy_agreed FROM users WHERE  id = ${user_info.user_id};`;
  return selectusers;
};

module.exports = {
  getUserByEmail,
  createUser,
  selectUser,
  deleteUser,
  getUser,
  updateUser,
  selectUser_2,
};
