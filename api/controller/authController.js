import { z } from "zod"
import User from "../modals/userModal.js"
import errorHandler from "../utils/error.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


const signupSchema = z.object({
    username: z.string()
        .min(1, "Username cannot be empty") // First check for non-empty string
        .refine(value => value.length >= 4, "Username must be at least 4 characters long"),
    email: z.string()
        .min(1, "Email cannot be empty") // First check for non-empty string
        .email("Invalid email format"),
    password: z.string()
        .min(1, "Password cannot be empty") // First check for non-empty string
        .refine(value => value.length >= 6, "Password must be at least 6 characters long"),
});








const signup = async (req, res, next) => {
    const validate = signupSchema.safeParse(req.body);
    if (!validate.success) {
        const error = validate.error.errors.map((err) => err.message)
        const newError = new Error();
        newError.message = error.join(", ")
        newError.statusCode = 400;
        next(newError)
        return

    }
    try {
        const serch = await User.findOne({ email: req.body.email })
        if (serch) {
            const newError = new Error();
            newError.message = "email already exist"
            newError.statusCode = 400;
            next(newError)

        }
        else {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await User.create({
                username: req.body.username,
                password: hash,
                email: req.body.email
            })

            if (newUser) {
                res.status(200).json({ message: "user created" })
                return
            }
        }
    }
    catch (err) {
        next(err)

    }

}

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const errorobj = errorHandler(400, "Enter correct email / password");
            next(errorobj);
            return
        }
        const find = await User.findOne({ email: email })
        if (!find) {
            const errorobj = errorHandler(400, "invalid email");
            next(errorobj);
            return
        }
        else {
            const match = await bcrypt.compare(password, find.password)
            if (!match) {
                const errorobj = errorHandler(400, "incorrect password");
                next(errorobj);
                return
            }
            else {

                const token = jwt.sign({ _id: User._id }, process.env.key, { expiresIn: "2d" });
                res.status(200).cookie("jwt", token, {
                    httpOnly: true,
                    sameSite: 'strict', // Helps prevent CSRF attacks
                    maxAge: 2 * 24 * 60 * 60 * 1000

                }).json(find);
            }
        }

    }
    catch (err) {
        next(err)

    }





}


export { signup, signin }