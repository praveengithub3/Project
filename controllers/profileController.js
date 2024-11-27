const User = require("../models/userModel");
const { sendResponse } = require("../utils/responseHandeler");


exports.getProfile = async (req, res) => {
    try {
        const userId = req.body; 
        const id=userId.userId;
        console.log(userId.userId);
        
        const user = await User.findOne({_id:id});

        if (!user) {
            return sendResponse(res, 404, "User not found.");
        }

        return sendResponse(res, 200, "Profile fetched successfully.", user.profil);
    } catch (error) {
        return sendResponse(res, 500, "Server error.");
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { name, email,userId } = req.body;

        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { "profile.name": name, "profile.email": email },
            { new: true }
        );

        return sendResponse(res, 200, "Profile updated successfully.", updatedProfile.profile);
    } catch (error) {
        return sendResponse(res, 500, "Server error.");
    }
};


