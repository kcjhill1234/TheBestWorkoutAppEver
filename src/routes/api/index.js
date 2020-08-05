const router = require("express").Router();
const verifyToken = require("../../middleware/authjwt")
const authRoutes = require("./auth.route")
const filterRoutes = require("./filter.route")
const exerciseRoutes = require("./exercise.route")
router.use("/auth", authRoutes)
router.use("/filter", verifyToken, filterRoutes)
router.use("/exercise", verifyToken, exerciseRoutes)
module.exports = router;
