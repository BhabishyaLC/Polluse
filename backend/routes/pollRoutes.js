import express from 'express'
import createPollController from '../controllers/pollController.js'
const router= express.Router()

router.post('/create', createPollController)



export default router