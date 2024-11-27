const Store = require("../models/storeModel");
const { sendResponse } = require("../utils/responseHandeler");


exports.addStore=async(req,res)=>{
    try {
        const {name,location,contactNo,openingTime,closingTime} = req.body;
        const store = new Store({name,location,contactNo,openingTime,closingTime});
        const result=await store.save()
        sendResponse(res,200,"store Added Successfully",result);
        } catch (error) {
            sendResponse(res,500,"Error Occured",error.message)
                }
                
}

exports.getStoreDetails = async (req, res) => {
    try {
        const { id } = req.body; 

        const store = await Store.findById({_id:id});
        if (!store) {
            return sendResponse(res, 404, "Store not found.");
        }

        return sendResponse(res, 200, "Store details fetched successfully.", store);
    } catch (error) {
        console.error("Error fetching store details:", error);
        return sendResponse(res, 500, "Server error.");
    }
};

exports.listStores = async (req, res) => {
    try {
        const { limit = 10, pageNo = 1 } = req.body;

        const stores = await Store.find().skip((pageNo - 1) * limit).limit(Number(limit));
        const totalCount = await Store.countDocuments();
        return sendResponse(res, 200, "Stores fetched successfully.", {totalCount,currentPage: Number(pageNo),stores,});
    } catch (error) {
        console.error("Error fetching stores:", error);
        return sendResponse(res, 500, "Server error.");
    }
};


exports.updateStore = async (req, res) => {
    try {
        const { id,name, location, contactNo, openingTime, closingTime, address } = req.body;

        const store = await Store.findById(id);
        if (!store) {
            return sendResponse(res, 404, "Store not found.");
        }

        store.name = name || store.name;
        store.location = location || store.location;
        store.contactNo = contactNo || store.contactNo;
        store.openingTime = openingTime || store.openingTime;
        store.closingTime = closingTime || store.closingTime;
        store.address = address || store.address;

        await store.save();

        return sendResponse(res, 200, "Store updated successfully.", store);
    } catch (error) {
        console.error("Error updating store:", error);
        return sendResponse(res, 500, "Server error.");
    }
};
