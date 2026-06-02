import express from 'express'
import {authLogin, authRegister} from '../controllers/authController.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
const router=express.Router()


router.post('/login', authLogin)
router.post('/register', authRegister)

router.get('/google', passport.authenticate('google',{
    scope:['profile','email'],
    session:false
}))

router.get('/google/callback', passport.authenticate('google',{
    failureRedirect:'/login',
    session:false
}),

(req,res)=>{
    const token= jwt.sign({id:req.user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'7d'})

    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`)
}


)

export default router