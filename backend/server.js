import express from "express"
import dotenv from 'dotenv'
import database from "./config/database.js"
import authRoutes from '../backend/routes/authRoutes.js'
import pollRoutes from '../backend/routes/pollRoutes.js'
import cors from 'cors'
import passport from '../backend/config/passport.js'
import cookieParser from 'cookie-parser'
import { requireAuth } from "./middleware/jwt.js"
import setupPollSocket from "./controllers/pollSocket.js"
import http from 'http'
import { Server } from "socket.io"

dotenv.config()

const app=express()

app.use(express.json())

app.use(passport.initialize())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(cookieParser())

database()

const server=http.createServer(app)

const io=new Server(server,{
    cors:{origin:'*'}
})


app.use('/api/auth', authRoutes)
app.use('/api/poll', pollRoutes)

app.get("/api/me",requireAuth, (req,res)=>{
    if(!req.user){
        return res.status(400).json({message:"Unauthorized"})
    }
    res.status(200).json({user:req.user})

})


setupPollSocket(io)


app.listen(process.env.PORT,()=>{
    console.log(`Server is active at http://localhost:${process.env.PORT}`)
})

app.get('/',(req,res)=>{
    res.send("Server is active")    
})

server.listen(3001,()=>console.log("Server running..."))