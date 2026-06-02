import mongoose from 'mongoose'

const UserModel= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
      
    },
    
    avatar:{
        type:String
    },

    authMethod:{
        type:String,
        enum:['local','google'],
        default:'local'
    }
    
},{
    timestamps:true
}

)

const Users=mongoose.model('Users', UserModel)

export default Users