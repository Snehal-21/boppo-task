import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/routes.js";

const app=express();
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api',router);

mongoose.connect(process.env.MONGO)
.then(()=>console.log("Db Connected"))
.catch((err)=>console.log("DB error",err));

const port=process.env.port || 5000;

app.listen(port,()=>console.log(`listening on port ${port}`));
