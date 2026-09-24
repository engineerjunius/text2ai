import express from 'express'
import { generateImage, generateGuestImage, guestStatus } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)

// Free trial for visitors who aren't logged in (limited per IP)
imageRouter.get('/guest-status', guestStatus)
imageRouter.post('/generate-image-guest', generateGuestImage)

export default imageRouter
