// Text-to-image providers, tried in order: Cloudflare Workers AI (free daily quota),
// then Pollinations as a fallback when Cloudflare is out of quota or failing.

const TIMEOUT_MS = 60_000

class ProviderError extends Error {
    constructor(provider, message, status) {
        super(`${provider}: ${message}`)
        this.status = status
    }
}

const callCloudflare = async (prompt, seed) => {
    const {CF_ACCOUNT_ID, CF_API_TOKEN} = process.env
    const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`

    const res = await fetch(url, {
        method: 'POST',
        headers: {Authorization: `Bearer ${CF_API_TOKEN}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({prompt, steps: 4, seed}),
        signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.result?.image) {
        throw new ProviderError('Cloudflare', data?.errors?.[0]?.message || `HTTP ${res.status}`, res.status)
    }
    return `data:image/jpeg;base64,${data.result.image}`
}

const callPollinations = async (prompt, seed) => {
    const params = new URLSearchParams({model: 'flux', width: '1024', height: '1024', seed: String(seed), nologo: 'true'})
    const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?${params}`

    const res = await fetch(url, {
        headers: {Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`},
        signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new ProviderError('Pollinations', text.slice(0, 200) || `HTTP ${res.status}`, res.status)
    }
    const type = res.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await res.arrayBuffer())
    return `data:${type};base64,${buffer.toString('base64')}`
}

const providers = [
    {name: 'cloudflare', enabled: () => process.env.CF_ACCOUNT_ID && process.env.CF_API_TOKEN, call: callCloudflare},
    {name: 'pollinations', enabled: () => process.env.POLLINATIONS_API_KEY, call: callPollinations},
]

export const hasProvider = () => providers.some(p => p.enabled())

export const generateImage = async (prompt, seed = Math.floor(Math.random() * 2 ** 31)) => {
    const errors = []
    for (const provider of providers) {
        if (!provider.enabled()) continue
        try {
            const image = await provider.call(prompt, seed)
            return {image, seed, provider: provider.name}
        } catch (error) {
            // Log the real reason server-side, then fall through to the next provider
            console.log(error.message)
            errors.push(error)
        }
    }
    const error = new Error('Image generation is unavailable right now. Please try again later.')
    error.quotaExceeded = errors.length > 0 && errors.every(e => e.status === 429)
    throw error
}
