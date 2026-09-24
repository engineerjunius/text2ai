import mongoose from "mongoose";

// Tracks free generations used by visitors who aren't logged in, keyed by IP.
// Records expire automatically after 30 days, which resets that visitor's trial.
const guestTrialSchema = new mongoose.Schema({
    ip: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 30 },
})

const guestTrialModel = mongoose.models.guestTrial || mongoose.model('guestTrial', guestTrialSchema)

export default guestTrialModel;
