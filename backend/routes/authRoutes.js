import express from "express"
import passport from "passport"
const router = express.Router()

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
        // Successful authentication, redirect to the profile page
        res.redirect('http://localhost:8003/api/user/profile');
    }
);

export default router;