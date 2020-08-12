import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'


const authContext = createContext()
const USER_KEY = "user"

export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_KEY)));

    const signUp = ({ userName, firstName, lastName, email, password }) => {
        return axios.post('/api/auth/signUp', {
            userName, firstName, lastName, email, password
        })
    }
    const signIn = ({ userName, password }) => {
        return axios.post("/api/auth/signIn", {
            userName, password
        }).then(res => {
            if (res.data.accessToken) {
                const user = res.data
                localStorage.setItem(USER_KEY, JSON.stringify(user))
                setUser(user)
            }
            return res.data.userName
        })
    }
    const logout = () => {
        localStorage.removeItem(USER_KEY)
        setUser(null)
    }

    return {
        user,
        signIn,
        signUp,
        logout
    }

}