import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import imageRouter from './routes/imageRoutes.js'
import { hasProvider } from './services/imageProvider.js'

if (!hasProvider()) {
    console.error('No image provider configured: set CF_ACCOUNT_ID + CF_API_TOKEN and/or POLLINATIONS_API_KEY (see .env.example)')
    process.exit(1)
}

const PORT = process.env.PORT || 4000
const app = express()

// Behind a hosting proxy (Render, Railway, Vercel...), set TRUST_PROXY=1 so req.ip
// is the visitor's real IP, which the daily limit is counted against
if (process.env.TRUST_PROXY) {
    app.set('trust proxy', Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY)
}

app.use(express.json())
app.use(cors())

app.use('/api/image', imageRouter)
app.get('/', (req, res) => res.send("API working"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
