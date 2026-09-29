const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/TrainingNodejsEvening")
        console.log("Mongodb connected")

    } catch (error) {
        console.log("Mongodb connection error", error.message)


    }
}

module.exports = connectDB