const express = require("express");
const router = express.Router();
const { addStore,getStoreDetails, listStores, updateStore } = require("../controllers/storeController");
const authMiddleware = require("../middelware/authMiddelware");

router.use(authMiddleware); 
router.post("/store/add",addStore)
router.get("/store", getStoreDetails);
router.post("/store", listStores);
router.patch("/store", updateStore);

module.exports = router;
