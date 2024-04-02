export const checkAddCategory=async(req,res,next)=>{
    try {
        const {name,description}=req.body;
        if(!name) return res.status(404).json({status:404,success:false,message:"Please enter product name"});
        if(!description) return res.status(404).json({status:404,success:false,message:"Please enter product description"});
        next();
    } catch (error) {
        return res.status(500).json({staus:500,success:false,message:"Internal server error",error:error.message})
    }
}