const axios = require("axios")
const { Category, Comment, Equipment, Exercise, Image, Muscle } = require("./index")

const BASE_URL = "https://wger.de/api/v2/"

const workOutManager = (endpoint, params = {}) => axios.get(BASE_URL + endpoint, { params })

const store = async () => {
    if ((await Category.estimatedDocumentCount()) === 0) {
        const wCategory = (await workOutManager("exercisecategory")).data
        const newCategory = wCategory.map(({ id, name }) => ({ _id: id, name }))
        await Category.insertMany(newCategory)
        console.log("Category Inserted")
    }
    if ((await Equipment.estimatedDocumentCount()) === 0) {
        const wEquipment = (await workOutManager("equipment")).data
        const newEquipment = wEquipment.map(({ id, name }) => ({ _id: id, name }))
        await Equipment.insertMany(newEquipment)
        console.log("Equipment Inserted")
    }
    if ((await Comment.estimatedDocumentCount()) === 0) {
        const wComment = (await workOutManager("exercisecomment", { status: 2, language: 2 })).data
        const newComment = wComment.map(({ id, comment, exercise }) => ({ _id: id, comment, exercise }))
        await Comment.insertMany(newComment)
        console.log("Comment Inserted")
    }
    if ((await Exercise.estimatedDocumentCount()) === 0) {
        const wExercise = (await workOutManager("exercise", { status: 2, language: 2 })).data
        const newExercise = wExercise.map(({ id, name, description, muscles, equipment, category, muscles_secondary }) =>
            ({ _id: id, name, description, muscles, equipment, category, musclesSecondary: muscles_secondary }))
        await Exercise.insertMany(newExercise)
        console.log("Exercise Inserted")
    }
    if ((await Image.estimatedDocumentCount()) === 0) {
        const wImage = (await workOutManager("exerciseimage", { status: 2, language: 2 })).data
        const newImage = wImage.map(({ id, image, exercise }) => ({ _id: id, image, exercise }))
        await Image.insertMany(newImage)
        console.log("Image Inserted")
    }
    if ((await Muscle.estimatedDocumentCount()) === 0) {
        const wMuscle = (await workOutManager("muscle")).data
        const newMuscle = wMuscle.map(({ id, name, is_front }) => ({ _id: id, name, isFront: is_front }))
        await Muscle.insertMany(newMuscle)
        console.log("Muscle Inserted")
    }
}
const remove = async () => {
    await Category.deleteMany()
    await Comment.deleteMany()
    await Equipment.deleteMany()
    await Exercise.deleteMany()
    await Image.deleteMany()
    await Muscle.deleteMany()
    console.log("collections removed")
}
module.exports = {
    store, 
    remove
}