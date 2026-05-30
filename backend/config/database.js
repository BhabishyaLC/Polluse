import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const database=async()=>{
    if(mongoose.connection.readyState>=1){
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed", error)
        throw error
    }
}

export default database