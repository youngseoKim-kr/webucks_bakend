const express = require("express");

const productController = require("../controllers/productController");
const { validateToken } = require("../middlewares/validateToken");

const router = express.Router();

router.get("/categories", productController.categories);
router.get("/products", productController.products);
router.get("/:id", productController.products);
router.get("/detail", productController.detail);
router.post("/likes", validateToken, productController.likes);
router.post("/commentInsert", validateToken, productController.commentInsert);

module.exports = router; // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
