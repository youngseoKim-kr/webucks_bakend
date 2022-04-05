const productDao = require("../models/productDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UNSAFE_NavigationContext } = require("react-router-dom");

const categories = async () => {
  const selectCategories = await productDao.categories();
  return selectCategories;
};

const products = async (id) => {
  const selectproducts = await productDao.products(id);
  return selectproducts;
};

const detail = async () => {
  const selectdetail = await productDao.detail();
  return selectdetail;
};

const likes = async (user_id, product_id) => {
  const selectusertable = await productDao.selectusertable(user_id);
  const selectproducttable = await productDao.selectproducttable(product_id);
  if (!selectusertable[0]) {
    const error = new Error("WRONG_USER");
    error.statusCode = 400;
    throw error;
  }
  if (!selectproducttable[0]) {
    const error = new Error("WRONG_PRODUCT");
    error.statusCode = 400;
    throw error;
  }
  const selectuser = await productDao.selectuser(user_id, product_id);

  if (!selectuser[0]) {
    const insertuser = await productDao.insertuser(user_id, product_id);
    return 1;
  } else {
    const updateuser = await productDao.updateuser(user_id, product_id);
    return 0;
  }
};

const commentInsert = async (product_id, content, id) => {
  const commentInsert = await productDao.commentInsert(product_id, content, id);

  return commentInsert;
};

module.exports = { categories, products, detail, likes, commentInsert };
