const productDao = require("../models/productDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UNSAFE_NavigationContext } = require("react-router-dom");

const categories = async () => {
  const selectCategories = await productDao.categories();
  return selectCategories;
};

const products = async () => {
  const selectproducts = await productDao.products();
  return selectproducts;
};

const detail = async () => {
  const selectdetail = await productDao.detail();
  return selectdetail;
};

module.exports = { categories, products, detail };
