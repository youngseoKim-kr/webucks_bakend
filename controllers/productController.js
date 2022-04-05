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
    const { id } = req.params;
    const selectproducts = await productService.products(id);

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

const likes = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;
    foundUser = req.foundUser;

    if (user_id === undefined || product_id === undefined) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const likes = await productService.likes(user_id, product_id);

    if (likes == 0) {
      res.status(201).json({
        message: "update_SUCESS",
        foundUser,
      });
    } else {
      res.status(201).json({
        message: "insert_SUCESS",
        foundUser,
      });
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const commentInsert = async (req, res, next) => {
  try {
    const { product_id, content } = req.body;
    const id = req.foundUser;

    const commentInsert = await productService.commentInsert(
      product_id,
      content,
      id
    );

    res.status(201).json({
      message: "insert_SUCESS",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { categories, products, detail, likes, commentInsert };
