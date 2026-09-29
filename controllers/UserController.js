const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const sendOTP = require("../utils/otp")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    const exist = await UserModel.findOne({ email })
    if (exist) {
        return res.status(400).json({
            message: "User already exists."
        })
    }

    const hash = await bcrypt.hash(password, 10)

    await UserModel.create({
        name, email, password: hash
    })

    res.json({
        message: "User registered successfully."
    })
}


exports.sendOtp = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await UserModel.findOne({ email })
    if (!userExist) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    const match = await bcrypt.compare(password, userExist.password)
    if (!match) {
        return res.status(400).json({
            message: "Password does not match"
        })

    }
    const otp = Math.floor(100000 + Math.random() * 900000)
    userExist.otp = otp
    await userExist.save()
    await sendOTP(email, otp)
    res.json({
        message: "OTP sent"
    })

}

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "user not found."
        })

    }

    if (user.otp != otp) {
        return res.status(400).json({
            message: "Invalid OTP"
        })

    }

    user.otp = ""
    await user.save()

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_Secret, {
        expiresIn: "1d"
    }
    )
    res.json({
        message: "Login successful",
        token
    })

}

