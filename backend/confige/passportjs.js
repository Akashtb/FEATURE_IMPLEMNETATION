import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/User.js';

export default function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:8003/api/auth/google/callback"
            }, async (accessToken, refreshToken, profile, done) => {
                console.log('passport is authenticated');
                console.log(profile);
                const newUser = {
                    googleID: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    profilePic: profile.photos[0].value,
                    email: profile.emails[0].value,
                    qualification:"",
                    professional:"",
                    dateOfBirth:"",
                    age:"",
                    gender:"",
                    city:"",
                    state:"",
                    district:"",
                    password:"",
                    confirmPassword:"",
                    isAdmin:false,
                    isStaff:false
                };

                try {
                    let user = await User.findOne({ googleId: profile.id })
                    if (user) {
                        done(null, user)
                    }
                    else {
                        user = await User.create(newUser)
                        await user.save()

                        console.log(user);
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err);
                    done(err, null);
                }

            }
        )
    ),passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
}



