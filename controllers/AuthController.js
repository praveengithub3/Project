const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); 
const { sendResponse } = require("../utils/responseHandeler");
const generateOtp = require("../utils/otpGenerator");
const { generateAuthToken, generateRefreshToken } = require("../utils/tokenHandler");
const { log } = require("console");

exports.generateOtp = async (req, res) => {
    try {
        const { dialCode, contactNo } = req.body;

        if (!dialCode || !contactNo) {
            return sendResponse(res, 400, "Dial code and contact number are required.");
        }

        const otp = generateOtp();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        let user = await User.findOne({ dialCode, contactNo });

        if (!user) {
            user = new User({ dialCode, contactNo, otp, otpExpiresAt });
        } else {
            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;
        }

        await user.save();

        return sendResponse(res, 200, "OTP sent successfully.",user.otp);
    } catch (error) {
        return sendResponse(res, 500, "Server error.");
    }
};

exports.login = async (req, res) => {
    try {
        const { dialCode, contactNo, otp } = req.body;

        const user = await User.findOne({ dialCode, contactNo });

        if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
            return sendResponse(res, 401, "Invalid or expired OTP.");
        }

        user.authToken = generateAuthToken(user._id);
        user.refreshToken = generateRefreshToken(user._id);

        await user.save();

        return sendResponse(res, 200, "Login successful.", {
            authToken: user.authToken,
            refreshToken: user.refreshToken,
        });
    } catch (error) {
        return sendResponse(res, 500, "Server error.");
    }
};


exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return sendResponse(res, 400, "Refresh token is required.");
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return sendResponse(res, 401, "User not found.");
        }
        const newAuthToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return sendResponse(res, 200, "Token refreshed successfully.", { authToken: newAuthToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        return sendResponse(res, 401, "Invalid or expired refresh token.");
    }
};
