import Poll from '../models/poll.js'
import Vote from '../models/vote.js'
import crypto from 'crypto'
const vote=async (req,res)=>{
    try {
        const {shareToken}=req.params
        const {optionIndex}=req.body

        const poll=await Poll.findOne({shareToken})

        if(!poll){
            return res.status(400).json({message:"poll not found"})
        }

        if (optionIndex === undefined || optionIndex === null) {
            return res.status(400).json({ message: "Please select an option" });
         }

        if (optionIndex < 0 || optionIndex >= poll.options.length) {
            return res.status(400).json({ message: "Invalid option selected" });
          }

    const fingerprint = crypto
      .createHash("sha256")
      .update(req.ip + req.headers["user-agent"])
      .digest("hex");

    
    const existingVote = await Vote.findOne({
      pollId: poll._id,
      fingerprint,
    });

       if (existingVote) {
      return res.status(409).json({ message: "You have already voted on this poll" });
    }


    await Vote.create({
      pollId: poll._id,
      optionIndex,
      fingerprint,
    });

    
    poll.options[optionIndex].votes += 1;
    await poll.save();


    if (req.io) {
      req.io.to(poll._id.toString()).emit("vote-update", {
        options: poll.options,
      });
    }

    
    res.status(200).json({
      message: "Vote recorded successfully",
      options: poll.options,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export default vote