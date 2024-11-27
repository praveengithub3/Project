const express = require("express");
const router = express.Router();
const { listProducts, addProduct,addStock,removeStock,inventoryList } = require("../controllers/productController");

router.get("/products", listProducts);
router.post("/products", addProduct);
router.post("/add-stock", addStock);
router.post("/remove-stock", removeStock);
router.post("/inventory/list", inventoryList);

module.exports = router;
