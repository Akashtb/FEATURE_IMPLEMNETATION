import express from "express"

const router = express.Router()

router.get('/login',(req,res)=>{
    res.json('Successfully login')
})

router.post('/register',(req,res)=>{
    res.json("Successfully Register")
})

export default router;