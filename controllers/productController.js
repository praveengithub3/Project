const Product = require("../models/productModel");
const { sendResponse } = require("../utils/responseHandeler");


exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return sendResponse(res, 200, "Products fetched successfully.", products);
    } catch (error) {
        return sendResponse(res, 500, "Server error.");
    }
};


exports.addProduct = async (req, res) => {
    try {
        const { name, price, stock, unitType, category } = req.body;

        const product = new Product({ name, price, stock, unitType, category });
        await product.save();

        return sendResponse(res, 201, "Product added successfully.", product);
    } catch (error) {
        return sendResponse(res, 500, "Server error.");
    }
};

exports.addStock = async (req, res) => {
    try {
       
        const { id,stock } = req.body;

        if (!stock || stock <= 0) {
            return sendResponse(res, 400, "Invalid stock quantity.");
        }

        const product = await Product.findById(id);
        if (!product) {
            return sendResponse(res, 404, "Product not found.");
        }

        product.stock += stock; // Increase the stock
        await product.save();

        return sendResponse(res, 200, "Stock added successfully.", {
            productId: product._id,
            newStock: product.stock,
        });
    } catch (error) {
        console.error("Error adding stock:", error);
        return sendResponse(res, 500, "Server error.");
    }
};


exports.removeStock = async (req, res) => {
    try {
       
        const { id,stock } = req.body;

        if (!stock || stock <= 0) {
            return sendResponse(res, 400, "Invalid stock quantity.");
        }

        const product = await Product.findById(id);
        if (!product) {
            return sendResponse(res, 404, "Product not found.");
        }

        if (product.stock < stock) {
            return sendResponse(res, 400, "Insufficient stock.");
        }

        product.stock -= stock; // Decrease the stock
        await product.save();

        return sendResponse(res, 200, "Stock removed successfully.", {
            productId: product._id,
            newStock: product.stock,
        });
    } catch (error) {
        console.error("Error removing stock:", error);
        return sendResponse(res, 500, "Server error.");
    }
};


exports.inventoryList = async (req, res) => {
    try {
        const { limit = 10, pageNo = 1 } = req.body;

        const products = await Product.find()
            .skip((pageNo - 1) * limit)
            .limit(Number(limit));

        const totalCount = await Product.countDocuments();

        return sendResponse(res, 200, "Inventory fetched successfully.", {
            totalCount,
            currentPage: Number(pageNo),
            products,
        });
    } catch (error) {
        console.error("Error fetching inventory list:", error);
        return sendResponse(res, 500, "Server error.");
    }
};

