import axios from "axios"
import messageService from "./message.service"
const USER_KEY = "user"
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
            localStorage.setItem(USER_KEY, JSON.stringify(res.data))
        }
        return res.data
    })
}
const logout = (history) => {
    const user = getCurrentUser()
    localStorage.removeItem(USER_KEY)
    messageService.info(`${user.firstName} has logged out. Come back soon.`)
    history.push("/signIn")
}

const getCurrentUser = () => JSON.parse(localStorage.getItem(USER_KEY))

export const authHeader = () => {
    const user = getCurrentUser() 
    if (user && user.accessToken) {
        return {"x-access-token": user.accessToken}
    } else {
        return {}
    }
}
export default {
    signUp, signIn, logout, getCurrentUser
}