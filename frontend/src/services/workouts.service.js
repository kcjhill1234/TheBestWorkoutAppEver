import axios from "axios"
import authService from "./auth.service"

const BASE_URL = "/api/workout/" 
const axiosClient = axios.create({
    headers: {
        "x-access-token": authService.getCurrentUser()?.accessToken || "no token"
    }
})
const create = (name) => {
return axiosClient.post(BASE_URL, {name}).then(response => response.data)
}

const getAll = () => {
return axiosClient.get(BASE_URL).then(response => response.data)
}

const getById = (id) => {
    return axiosClient.get(BASE_URL + id).then(response => response.data)
}

const remove = (id) => {
return axiosClient.delete(BASE_URL + id)
}

const update = ({id, name, exercises}) => {
    return axiosClient.put(BASE_URL +id, {name, exercises}).then(response => response.data)
}
export default {create, getAll, getById, remove, update}