/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// Replace axios' vague "Network Error" when the backend is down or unreachable
axios.interceptors.response.use(null, (error) => {
    if (!error.response) {
        error.message = "Can't reach the server. Please try again in a moment."
    }
    return Promise.reject(error)
})

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(0)
    const [guestRemaining, setGuestRemaining] = useState(null)


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setCredit(0)
    }, [])

    const login = (newToken, newUser) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
        setUser(newUser)
    }

    const loadCreditsData = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', {headers: {token}})

            if(data.success) {
                setCredit(data.credits)
                setUser(data.user)
            } else if (data.authError) {
                // Stored token is expired or invalid: clear it instead of staying half-logged-in
                logout()
            }

        } catch (error) {
            toast.error(error.message)
        }
    }, [backendUrl, token, logout])

    const loadGuestStatus = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/image/guest-status')
            if (data.success) {
                setGuestRemaining(data.remaining)
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [backendUrl])

    // Free trial for visitors who aren't logged in
    const generateGuestImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image-guest', {prompt})

            if (data.success) {
                setGuestRemaining(data.remaining)
                return data.resultImage
            }

            toast.error(data.message)
            if (data.trialExhausted) {
                setGuestRemaining(0)
                setShowLogin(true)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt) => {
        if (!token) {
            return generateGuestImage(prompt)
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})

            if(data.success) {
                setCredit(data.creditBalance)
                return data.resultImage
            }

            toast.error(data.message)

            if (data.authError) {
                logout()
                setShowLogin(true)
                return
            }

            loadCreditsData()
            if (data.creditBalance === 0) {
                navigate('/buy')
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(token) {
            loadCreditsData()
        } else {
            loadGuestStatus()
        }
    }, [token, loadCreditsData, loadGuestStatus])


    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        guestRemaining,
        loadCreditsData,
        login,
        logout,
        generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
