import axios from "axios";
import userModel from "../models/userModel.js";
import guestTrialModel from "../models/guestTrialModel.js";
import FormData from "form-data";

const GUEST_FREE_LIMIT = Number(process.env.GUEST_FREE_LIMIT) || 2

const callClipdrop = async (prompt) => {
    const formData = new FormData()
    formData.append('prompt', prompt)

    const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
        headers: {
            'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer'
    })

    const base64Image = Buffer.from(data, 'binary').toString('base64')
    return `data:image/png;base64,${base64Image}`
}

const getErrorMessage = (error) => {
    // ClipDrop returns its error body as an arraybuffer because of responseType above
    let message = error.message
    if (error.response?.data) {
        try {
            message = JSON.parse(Buffer.from(error.response.data).toString()).error || message
        } catch { /* keep the default message */ }
    }
    return message
}

export const generateImage = async (req, res) => {

    try {
        const {prompt} = req.body
        const userId = req.userId

        if (!prompt || !prompt.trim()) {
            return res.json({success: false, message: "Please enter a prompt"})
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({success: false, message: "User not found"})
        }

        if (user.creditBalance <= 0) {
            return res.json({success: false, message: "Not enough credits", creditBalance: user.creditBalance})
        }

        const resultImage = await callClipdrop(prompt.trim())

        // Atomic decrement, guarded so parallel requests can't push the balance below zero
        const updatedUser = await userModel.findOneAndUpdate(
            {_id: user._id, creditBalance: {$gt: 0}},
            {$inc: {creditBalance: -1}},
            {new: true}
        )

        if (!updatedUser) {
            return res.json({success: false, message: "Not enough credits", creditBalance: 0})
        }

        res.json({success: true, message: "Image Generated", creditBalance: updatedUser.creditBalance, resultImage})

    } catch (error) {
        const message = getErrorMessage(error)
        console.log(message)
        res.json({success: false, message})
    }
}

export const guestStatus = async (req, res) => {
    try {
        const trial = await guestTrialModel.findOne({ip: req.ip})
        const used = trial?.count || 0
        res.json({success: true, remaining: Math.max(GUEST_FREE_LIMIT - used, 0), limit: GUEST_FREE_LIMIT})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const generateGuestImage = async (req, res) => {

    const {prompt} = req.body

    if (!prompt || !prompt.trim()) {
        return res.json({success: false, message: "Please enter a prompt"})
    }

    // Reserve a free try up front so parallel requests can't exceed the limit.
    // When the limit is reached the filter misses, the upsert collides with the
    // unique ip index, and we treat that duplicate-key error as "trial used up".
    let trial
    try {
        trial = await guestTrialModel.findOneAndUpdate(
            {ip: req.ip, count: {$lt: GUEST_FREE_LIMIT}},
            {$inc: {count: 1}},
            {upsert: true, new: true}
        )
    } catch (error) {
        if (error.code === 11000) {
            return res.json({success: false, trialExhausted: true, remaining: 0, message: "Your free trial is used up. Sign up to get 5 free credits!"})
        }
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }

    try {
        const resultImage = await callClipdrop(prompt.trim())
        res.json({success: true, message: "Image Generated", remaining: GUEST_FREE_LIMIT - trial.count, resultImage})

    } catch (error) {
        // Generation failed, so give the free try back
        await guestTrialModel.updateOne({ip: req.ip}, {$inc: {count: -1}}).catch(() => {})
        const message = getErrorMessage(error)
        console.log(message)
        res.json({success: false, message})
    }
}
