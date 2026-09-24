import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})

const registerUser = async (req, res) => {

    try {
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            return res.json({success: false, message: "All fields are required"})
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Password must be at least 8 characters"})
        }

        const normalizedEmail = email.trim().toLowerCase()

        const exists = await userModel.findOne({email: normalizedEmail})
        if (exists) {
            return res.json({success: false, message: "An account with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email: normalizedEmail,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token, user: {name: user.name}})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.json({success: false, message: "Email and password are required"})
        }

        const user = await userModel.findOne({email: email.trim().toLowerCase()})

        // Same message for unknown email and wrong password, so accounts can't be enumerated
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({success: false, message: "Invalid email or password"})
        }

        const token = createToken(user._id)

        res.json({success: true, token, user: {name: user.name}})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const userCredits = async (req, res) => {

    try {
        const user = await userModel.findById(req.userId)

        if (!user) {
            return res.json({success: false, message: "User not found"})
        }

        res.json({success: true, credits: user.creditBalance, user: {name: user.name}})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, userCredits}
