import express from 'express'
import {createPollController,getPollController} from '../controllers/pollController.js'
import { requireAuth } from '../middleware/jwt.js'
import Poll from '../models/poll.js'
const router= express.Router()

router.post('/create', requireAuth ,createPollController)
router.get('/get', requireAuth ,getPollController)


router.get('/p/:shareToken',async(req,res)=>{
    try {
        const poll=await Poll.findOne({shareToken: req.params.shareToken})

        if(!poll){
             return res.status(404).json({ message: "Poll not found or has expired" });
        }

        res.json(poll)
        
    } catch (error) {
           res.status(500).json({ message: "Server error" });
    }
})






export default router