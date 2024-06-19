import express from "express";
import connect from "./db.js";
import dotenv from "dotenv"
import authRoute from "./routes/authRoutes.js"
const app = express()

dotenv.config()

//for testing purpose
app.use('/',(req,res)=>{
    res.send("Hello World")
})

//routes
app.use('/api/auth',authRoute)

app.listen('8003',()=>{
    connect()
    console.log("Server is running on port 8003")
})