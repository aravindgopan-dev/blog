import express from "express"
import {signup} from "../controller/authController.js"
const router = express.Router();


///api/auth/signup
router.post("/signup",signup)



export default router;