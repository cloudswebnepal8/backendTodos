const express=require('express')
const router=express.Router()
const auth=require("../controllers/UserController")

router.post("/register",auth.signup)
router.post("/sendOTP",auth.sendOtp)
router.post("/verifyOTP",auth.verifyOTP)

module.exports=router