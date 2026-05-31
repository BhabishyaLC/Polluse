import mongoose from 'mongoose'

const VoteModel=mongoose.Schema({
    pollId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Polls",
        required:true
    },

    optionIndex:{
        type:Number,
        required:true
    },

    fingerprint:{
        type:String,
        required:true
    }

},
{
    timestamps:true
}
)

VoteModel.index({pollId:1, fingerprint:1},{unique:true})

const Vote=mongoose.model('Votes',VoteModel)

export default Vote