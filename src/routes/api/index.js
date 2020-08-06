const router = require("express").Router();
const verifyToken = require("../../middleware/authjwt")
const authRoutes = require("./auth.route")
const filterRoutes = require("./filter.route")
const exerciseRoutes = require("./exercise.route")
const workoutRoutes = require("./workout.route")
router.use("/auth", authRoutes)
router.use("/filter", verifyToken, filterRoutes)
router.use("/exercise", verifyToken, exerciseRoutes)
router.use("/workout", verifyToken, workoutRoutes)
module.exports = router;
