import {z} from "zod"
import User from "../modals/userModal.js"
import { errorHandler } from "../utils/error.js"

const signupSchema=z.object({
    username:z.string().min(1),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"password must have 6 character")
})





const signup= async(req,res,next)=>{
    const result=signupSchema.safeParse(req.body)
    if(!result.success){
        const errors = result.error.errors.map(err => (
          err.message
          ));
          next(errorHandler(400,errors))
    }
    else{
        try{
            const newUser= await User.create(req.body)
            console.log(newUser)
            res.json({message:"sucess"})
        }
        catch(err){
            next(err)
        }

        
    }
    

    

}
export{signup}