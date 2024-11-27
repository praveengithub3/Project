const express = require("express");
const router = express.Router();
const { listCategories,addcategory } = require("../controllers/categoryController");
const authMiddleware = require("../middelware/authMiddelware");

router.use(authMiddleware); // Protect routes

router.post("/product-category/add",addcategory)
router.post("/product-category/list", listCategories);

module.exports = router;
