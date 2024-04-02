export const checkAddProduct=async(req,res,next)=>{
    try {
        const {name,description,category,price}=req.body;
        if(!name || !description || !category || !price) return res.status(404).json({status:404,success:false,message:"All Field are required"})
        next();
    } catch (error) {
        return res.status(500).json({staus:500,success:false,message:"Internal server error",error:error.message})
    }
}