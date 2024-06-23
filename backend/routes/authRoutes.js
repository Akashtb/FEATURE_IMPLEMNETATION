import express from "express"
import passport from "passport"
import twilio from 'twilio'
import dotenv from 'dotenv'
const router = express.Router()
dotenv.config()

const accoundSid = process.env.accoundSid
const authtoken = process.env.authtoken

const client = twilio(accoundSid,authtoken)
const otps = {};

router.get('/login', (req, res) => {
    res.send('Successfully login')
})

router.post('/register', (req, res) => {
    res.json("Successfully Register")
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:8003/api/auth/login' }),
    (req, res) => {
        console.log(res);
        // Successful authentication, redirect to the profile page
        res.redirect('http://localhost:8003/api/user/profile');
    }
);

router.post('/send-otp',async(req,res)=>{
    const {phoneNumber} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from:process.env.TWILIO_PHONE_NUMBER,
            to:phoneNumber
        })
        otps[phoneNumber] = otp;
        res.status(200).send(`OTP sent to ${phoneNumber}`);
    } catch (error) {
        res.status(500).send('Failed to send OTP');
    }
})

router.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (otps[phoneNumber] && otps[phoneNumber] === otp) {
        delete otps[phoneNumber];
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP or OTP expired');
    }
});

export default router;