const productService = require("../services/productService");

// 아래 정의된 함수는 지난 수업시간에 다룬 내용 입니다.

const categories = async (req, res, next) => {
  try {
    const selectCategories = await productService.categories();

    res.status(201).json({
      selectCategories,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const products = async (req, res, next) => {
  try {
    const selectproducts = await productService.products();

    res.status(201).json({
      selectproducts,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const detail = async (req, res, next) => {
  try {
    const selectDetail = await productService.detail();

    res.status(201).json({
      selectDetail,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { categories, products, detail };
