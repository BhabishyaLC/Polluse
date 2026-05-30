import express from "express"
import dotenv from 'dotenv'
import database from "./config/database.js"

dotenv.config()

const app=express()


database()

app.listen(process.env.PORT,()=>{
    console.log(`Server is active at http://localhost:${process.env.PORT}`)
})


app.get('/',(req,res)=>{
    res.send("Server is active")    
})