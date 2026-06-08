import Poll from "../models/poll.js"

const createPollController=async(req,res)=>{

    try {
       

        const newPoll= await Poll.create({
            question:req.body.question,
            options:req.body.options,
            createdBy:req.user.id
        })

        res.status(201).json({message:"Poll created successfully!", newPoll})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong..."})
    }


}

const getPollController=async(req,res)=>{
    try {
        
        const {id}=req.user

        const poll=await Poll.find({createdBy:id}).sort({createdAt:-1})

    

        res.status(200).json({poll})



    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong "})
    }
}



export  {createPollController, getPollController}