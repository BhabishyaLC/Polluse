import mongoose from 'mongoose'

const UserModel= mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
 
},{
    timestamps:true
}

)

const Users=mongoose.model('Users', UserModel)

export default Users