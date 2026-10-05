import express from 'express'
import { generateImage, usage } from '../controllers/imageController.js'

const imageRouter = express.Router()

imageRouter.get('/usage', usage)
imageRouter.post('/generate', generateImage)

export default imageRouter
