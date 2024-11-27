const Category = require("../models/categoryModel");
const { sendResponse } = require("../utils/responseHandeler");

exports.addcategory=async(req,res)=>{
    try {
        const {name,description}=req.body;
        const category=new Category({name,description});
        const result=await category.save()
        sendResponse(res,200,"Category Added Successfully",result);
        } catch (error) {
            sendResponse(res,500,"Error Occured",error.message)
                }
                
}


exports.listCategories = async (req, res) => {
    try {
        const { limit = 10, pageNo = 1 } = req.body;

        const categories = await Category.find()
            .skip((pageNo - 1) * limit)
            .limit(Number(limit));

        const totalCount = await Category.countDocuments();

        return sendResponse(res, 200, "Categories fetched successfully.", {
            totalCount,
            currentPage: Number(pageNo),
            categories,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return sendResponse(res, 500, "Server error.");
    }
};
