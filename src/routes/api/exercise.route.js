const router = require("express").Router();
const exerciseController = require("../../controllers/exercises.controller")
router.get("/", exerciseController.getAllByFilter)
router.get("/:id", exerciseController.getById)

module.exports = router