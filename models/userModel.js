const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    dialCode: { type: Number, required: true },
    contactNo: { type: String, required: true },
    otp: { type: Number },
    otpExpiresAt: { type: Date },
    authToken: { type: String },
    refreshToken: { type: String },
    profile: {
        name: { type: String },
        email: { type: String },
        referralNo: { type: String },
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
