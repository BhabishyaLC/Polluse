import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import Users from '../models/users.js'

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"api/auth/google/callback"
},
       async(refreshToken, accessToken, profile, done)=>{
        try {
            let user= await Users.findOne({email:profile.email[0].value})

            if(!user) {
                user= await User.create({
                    name:profile.displayName,
                    email:profile.email[0].value,
                    avatar:profile.avatar[0].value,
                    authMethod:"google"
                })
            }

            return done(null, user)
        } catch (error) {
            return done(error,null)
        }
       }
))


export default passport

