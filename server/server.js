import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import imageRouter from './routes/imageRoutes.js'

const missing = ['MONGODB_URI', 'JWT_SECRET', 'CLIPDROP_API'].filter(key => !process.env[key])
if (missing.length) {
    console.error(`Missing environment variables: ${missing.join(', ')} (see .env.example)`)
    process.exit(1)
}

const PORT = process.env.PORT || 4000
const app = express()

// Behind a hosting proxy (Render, Railway, Vercel...), set TRUST_PROXY=1 so req.ip
// is the visitor's real IP, which the guest free trial is counted against
if (process.env.TRUST_PROXY) {
    app.set('trust proxy', Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY)
}

app.use(express.json())
app.use(cors())

try {
    await connectDB()
} catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
}

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res) => res.send("API working"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
