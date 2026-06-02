import express from "express"
import dotenv from 'dotenv'
import database from "./config/database.js"
import authRoutes from '../backend/routes/authRoutes.js'
import cors from 'cors'
import passport from '../backend/config/passport.js'


dotenv.config()

const app=express()

app.use(express.json())

app.use(passport.initialize())

app.use(cors({
    origin:'http:localhost:5173',
    credentials:true
}))


database()


app.use('/api/auth', authRoutes)





app.listen(process.env.PORT,()=>{
    console.log(`Server is active at http://localhost:${process.env.PORT}`)
})

app.get('/',(req,res)=>{
    res.send("Server is active")    
})