const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/profileController");
const authMiddleware = require("../middelware/authMiddelware");

router.use(authMiddleware);
router.get("/profile", getProfile);
router.patch("/profile", updateProfile);

module.exports = router;
