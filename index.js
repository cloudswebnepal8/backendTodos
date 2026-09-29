require ("dotenv").config()
const express = require("express")
const cors=require("cors")
const userRoutes=require("./routes/UserRoutes")
const todoRoutes = require("./routes/todoRoutes")

const connectDB=require("./config/db")
const app = express()
connectDB()

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json())

app.use("/auth",userRoutes)
app.use("/todos", todoRoutes)

app.listen(5000, () => {
    console.log("Server running on port 5000")
})