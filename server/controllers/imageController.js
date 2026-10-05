import { generateImage as runProviders } from "../services/imageProvider.js";
import { getUsage, reserve, release } from "../middlewares/rateLimit.js";

const MAX_PROMPT_LENGTH = 1000

export const usage = (req, res) => {
    res.json({success: true, ...getUsage(req.ip)})
}

export const generateImage = async (req, res) => {
    const prompt = typeof req.body.prompt === 'string' ? req.body.prompt.trim() : ''
    const seed = Number.isInteger(req.body.seed) && req.body.seed >= 0 ? req.body.seed : undefined

    if (!prompt) {
        return res.json({success: false, message: "Please enter a prompt"})
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
        return res.json({success: false, message: `Prompts can be at most ${MAX_PROMPT_LENGTH} characters`})
    }

    const reservation = reserve(req.ip)
    if (!reservation.ok) {
        return res.json({success: false, limitReached: true, remaining: 0, message: reservation.message})
    }

    try {
        const result = await runProviders(prompt, seed)
        res.json({success: true, resultImage: result.image, seed: result.seed, remaining: getUsage(req.ip).remaining})
    } catch (error) {
        // Generation failed, so give the free try back
        release(req.ip)
        res.json({success: false, message: error.message, remaining: getUsage(req.ip).remaining})
    }
}
