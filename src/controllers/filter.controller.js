const { Category, Equipment, Muscle } = require("../models")

const getCategories = async (req, res) => {
    const categories = await Category.find({}).catch((error) => res.status(500).send({ message: error }))
    if (categories.length === 0) {
        return res.status(404).send({ message: "not categories" })
    }
    return res.status(200).json({
        categories: categories.map(({ _id, name }) => ({ id: _id, name }))
    })
}

const getEquipment = async (req, res) => {
    const equipment = await Equipment.find({}).catch((error) => res.status(500).send({ message: error }))
    if (equipment.length === 0) {
        return res.status(404).send({ message: "not equipment" })
    }
    return res.status(200).json({
        equipment: equipment.map(({ _id, name }) => ({ id: _id, name }))
    })
}
const getMuscle = async (req, res) => {
    const muscles = await Muscle.find({}).catch((error) => res.status(500).send({ message: error }))
    if (muscles.length === 0) {
        return res.status(404).send({ message: "not muscles" })
    }
    return res.status(200).json({
        muscles: muscles.map(({ _id, name, isFront }) => ({ id: _id, name, isFront }))
    })
}
module.exports = { getCategories, getEquipment, getMuscle }