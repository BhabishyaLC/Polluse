import jwt, { decode } from 'jsonwebtoken'


const generateToken=(userData)=>{
    return jwt.sign({userData},process.env.JWT_SECRET_KEY,{expiresIn:"24h"})
}

const requireAuth=(req,res,next)=>{

    const {token}=req.cookies

    if(!token) return res.status(400).json({message:"Token not found"})

        try {
            const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user=decoded

            next()
        } catch (error) {
             res.status(401).json({message:"Invalid Token"})
        }

}

export {generateToken,requireAuth}