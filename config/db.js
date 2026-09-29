const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://cloud:cloud123@cluster0.mmaojop.mongodb.net/TrainingNodejsEvening")
        console.log("Mongodb connected")

    } catch (error) {
        console.log("Mongodb connection error", error.message)


    }
}

module.exports = connectDB