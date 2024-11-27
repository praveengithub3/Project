const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: Missing or malformed token." });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the decoded ID
        const user = await User.findById(decoded.id).select("-password"); // Exclude password from the user data

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found." });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token." });
    }
};

module.exports = authMiddleware;
