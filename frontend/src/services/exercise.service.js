import axios from "axios"
import authService from "./auth.service"
const BASE_URL = "/api/"

const workOutManager = (endpoint, params = {}) => axios.get(BASE_URL + endpoint, {
    params, 
    headers: {
        "x-access-token": authService.getCurrentUser()?.accessToken || "no token"
    }
}).then(res => res.data)

const getByFilter = ({searchName, category, equipment, muscle}) => {
    const params = new URLSearchParams()
    if (searchName) {
        params.append("text", searchName)
    }
    if ( category) {
        params.append("category", category)
    }
    if (equipment) {
        params.append("equipment", equipment)
    }
    if (muscle) {
        params.append("muscle", muscle)
    }
    return workOutManager("exercise", params).then(({exercises}) => exercises )
}
const getById = id => workOutManager("exercise/" + id ).then(({exercise}) => exercise)

const categories = () => workOutManager("filter/category")
    .then(response => response.categories.map( ({id, name}) => ({key: id, value: id, text: name})))

const  muscles = () => workOutManager("filter/muscle")
    .then(response => response.muscles.map(({id, name}) => ({key: id, value: id, text: name})))

const  equipment = () => workOutManager("filter/equipment")
    .then(response => response.equipment.map(({id, name}) => ({key: id, value: id, text: name})))

    export default {
        getByFilter, 
        getById,
        categories,
        muscles,
        equipment
    }
