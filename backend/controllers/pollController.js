import Poll from "../models/poll.js"

const createPollController=async(req,res)=>{

    try {
        

        const newPoll= await Poll.create({
            question:req.body.question,
            options:req.body.options
        })

        res.status(201).json({message:"Poll created successfully!", newPoll})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong..."})
    }


}



export default createPollController