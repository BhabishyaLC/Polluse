import express from 'express'
import {createPollController,getPollController} from '../controllers/pollController.js'
import { requireAuth } from '../middleware/jwt.js'
const router= express.Router()

router.post('/create', requireAuth ,createPollController)
router.get('/get', requireAuth ,getPollController)




export default router