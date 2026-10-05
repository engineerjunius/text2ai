/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL

const request = async (path, options) => {
    try {
        const res = await fetch(backendUrl + path, options)
        return await res.json()
    } catch {
        // Replace the browser's vague "Failed to fetch" when the backend is down or unreachable
        return {success: false, message: "Can't reach the server. Please try again in a moment."}
    }
}

const AppContextProvider = ({ children }) => {
    // Free images left today for this visitor (null until loaded)
    const [remaining, setRemaining] = useState(null)
    const [limit, setLimit] = useState(null)

    const loadUsage = useCallback(async () => {
        const data = await request('/api/image/usage')
        if (data.success) {
            setRemaining(data.remaining)
            setLimit(data.limit)
        }
    }, [])

    // Resolves to {image, seed} on success, or null after showing the error
    const generateImage = async (prompt, seed) => {
        const data = await request('/api/image/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({prompt, seed}),
        })

        if (typeof data.remaining === 'number') {
            setRemaining(data.remaining)
        }
        if (data.success) {
            return {image: data.resultImage, seed: data.seed}
        }
        toast.error(data.message)
        return null
    }

    useEffect(() => {
        loadUsage()
    }, [loadUsage])

    const value = {
        remaining,
        limit,
        generateImage,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
