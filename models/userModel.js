const mongoose = require("mongoose")
const UserModel =new mongoose.Schema({
    name: String,
    email: {
        type: String,
        uniquie: true
    },
    password: String,
    otp:Number
})

module.exports=mongoose.model("User",UserModel)