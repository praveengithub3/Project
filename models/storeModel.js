const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contactNo: { type: String, required: true },
    openingTime: { type: String },
    closingTime: { type: String },
    address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        country: { type: String },
    },
}, { timestamps: true });

module.exports = mongoose.model("Store", StoreSchema);
