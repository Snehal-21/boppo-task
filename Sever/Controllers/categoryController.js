import Category from "../models/category.js";

export const addCategory=async(req,res)=>{
    try {
        const {name,description}=req.body;
        const newCategory=new Category({
            name,
            description
        });
        await newCategory.save();
        return res.status(201).json({status:201,success:true,message:"Category added successfully."})
    } catch (error) {
        return res.status(500).json({staus:500,success:false,message:"Internal server error",error:error.message});
    }
}

export const getCategory=async(req,res)=>{
    try {
        const response=await Category.find({}).exec();
        return res.status(200).json({status:200,success:true,message:"Categories fetched successfully.",total_Category:response.length,data:response})

    } catch (error) {
        return res.status(500).json({staus:500,success:false,message:"Internal server error",error:error.message});
    }
}