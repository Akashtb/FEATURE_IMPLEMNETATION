import express from "express";
import connect from "./db.js";
import dotenv from "dotenv"
import authRoute from "./routes/authRoutes.js"
import passport from "passport";
import passportSetup from './confige/passportjs.js'
import session from 'express-session';

const app = express()

dotenv.config()
app.use(express.json())
//for testing purpose
// app.use('/',(req,res)=>{
//     res.send("Hello World")
// })
passportSetup(passport)
app.use(
    session({
      secret: 'yourSecretKey21',
      resave: false,
      saveUninitialized: false,
    })
  );
//routes
app.use('/api/auth',authRoute)

app.listen(8003,()=>{
    connect()
    console.log("Server is running on port 8003")
})