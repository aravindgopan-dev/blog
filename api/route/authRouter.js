import express from "express"
import {signup,signin} from "../controller/authController.js"
const router = express.Router();


///api/auth/signup
router.post("/signup",signup)
router.post("/signin",signin)



export default router;