// In-memory daily limits: per visitor IP, plus a global cap that keeps us under the
// free provider quota. Counters reset at 00:00 UTC (when Cloudflare's quota resets)
// and also whenever the server restarts, so treat these as soft limits.

const DAILY_LIMIT_PER_IP = Number(process.env.DAILY_LIMIT_PER_IP) || 20
const GLOBAL_DAILY_LIMIT = Number(process.env.GLOBAL_DAILY_LIMIT) || 160

let day = null
let globalCount = 0
const ipCounts = new Map()

const resetIfNewDay = () => {
    const today = new Date().toISOString().slice(0, 10)
    if (today !== day) {
        day = today
        globalCount = 0
        ipCounts.clear()
    }
}

export const getUsage = (ip) => {
    resetIfNewDay()
    const used = ipCounts.get(ip) || 0
    const remaining = Math.max(Math.min(DAILY_LIMIT_PER_IP - used, GLOBAL_DAILY_LIMIT - globalCount), 0)
    return {remaining, limit: DAILY_LIMIT_PER_IP}
}

// Reserve one generation up front so parallel requests can't exceed the limits
export const reserve = (ip) => {
    resetIfNewDay()
    const used = ipCounts.get(ip) || 0
    if (globalCount >= GLOBAL_DAILY_LIMIT) {
        return {ok: false, message: "Today's free images are all used up. Please come back tomorrow!"}
    }
    if (used >= DAILY_LIMIT_PER_IP) {
        return {ok: false, message: `You've reached your ${DAILY_LIMIT_PER_IP} free images for today. Come back tomorrow!`}
    }
    ipCounts.set(ip, used + 1)
    globalCount++
    return {ok: true}
}

// Give a reservation back when generation fails
export const release = (ip) => {
    const used = ipCounts.get(ip) || 0
    if (used > 0) {
        ipCounts.set(ip, used - 1)
        globalCount = Math.max(globalCount - 1, 0)
    }
}
