const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database"); 

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const storeRoutes = require("./routes/stroreRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/v1/store-user/auth", authRoutes); 
app.use("/v1/store-user", profileRoutes); 
app.use("/v1/store-user", productCategoryRoutes); 
app.use("/v1/store-user", storeRoutes); 
app.use("/v1/store-user", productRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

module.exports = app;
