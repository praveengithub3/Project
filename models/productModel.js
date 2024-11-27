const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    unitType: { type: String, enum: ["unit", "pack", "gram", "kilogram", "litre"], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
