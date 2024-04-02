import express from "express";
import { checkAddCategory } from "../middlewares/categoryAuth.js";
import { addCategory, getCategory } from "../Controllers/categoryController.js";
import { checkAddProduct } from "../middlewares/productAuth.js";
import { addProduct, createMany, deleteProduct, get, getByHandle, updateProduct } from "../Controllers/productController.js";

const router=express.Router();

router.post("/category/add",checkAddCategory,addCategory);
router.get("/category/all",getCategory);

router.post("/product/add",checkAddProduct,addProduct);
router.get("/product/:id",getByHandle)
router.put("/product/update/:id",updateProduct)
router.delete("/product/delete/:id",deleteProduct)
router.get("/products/products",get)
router.post("/products/addProduct",createMany)

export default router;