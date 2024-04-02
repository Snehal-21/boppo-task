import mongoose from "mongoose";
import {Schema} from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categoryId:{
        ref:'category',
        type:mongoose.Schema.Types.ObjectId
    },
    slug:{
        type:String,
        required:true
    }
});

export default mongoose.model("Prodcut",productSchema);
