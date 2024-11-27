const express = require("express");
const { generateOtp, login, refreshToken } = require("../controllers/AuthController");

const router = express.Router();

router.post("/generate-otp", generateOtp);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

module.exports = router;
