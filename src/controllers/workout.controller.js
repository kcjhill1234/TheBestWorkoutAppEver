const { Workout } = require("../models")

const getAll = async (req, res) => {
    const { userId } = req
    const workouts = await Workout.find({ userId })
        .catch(error => res.status(500)
            .send({
                message: error
            }))
    res.status(200).json(workouts)
}


const getById = async (req, res) => {
    const { id } = req.params
    const workout = await Workout.findById( id )
        .catch(error => res.status(500)
            .send({
                message: error
            }))
    if (!workout) {
        return res.status(404).send({
            message: "workout not found"
        })
    } res.status(200).json(workout)
}


const create = async (req, res) => {
    const { name } = req.body
    const { userId } = req
    const newWorkout = await Workout.create({ name, userId })
        .catch(error => res.status(500)
            .send({
                message: error
            }))
    res.status(200).json(newWorkout)
}


const update = async (req, res) => {
    const { id } = req.params
    const { name, exercises } = req.body
    const query = {}
    if (name) {
        query.name = name 
    }
    if (exercises && exercises.length) {
        query.exercises = exercises
    }
    const workout = await Workout.findByIdAndUpdate(id, query)
        .catch(error => res.status(500)
            .send({
                message: error
            }))
    if (!workout) {
        return res.status(400).send({
            message: "workout not found"
        })
    }
    res.status(200).json(workout)
}


const remove = async (req, res) => {
    const { id } = req.params
    const workout = await Workout.findByIdAndDelete(id)
        .catch(error => res.status(500)
            .send({
                message: error
            }))
    if (!workout) {
        return res.status(400).send({
            message: "workout not found"
        })
    }
    res.status(200).json(workout)
}

module.exports = { getAll, getById, create, update, remove }