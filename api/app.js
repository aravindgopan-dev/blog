import  express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./route/userRoute.js"
import authRouter from "./route/authRouter.js"

const app=express()
dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
});


const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.url}`);
    next();
  };


app.use(logger)
app.use(express.json())


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


app.use((err,req,res,next)=>{
    console.log("here")
    const statusCode=err.statusCode || 500;
    const message=err.message || "internal server errror";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})





app.listen(3000,()=>{console.log("port:3000")})