const express = require('express')
const router = express.Router()

const { registerUser, loginUser } = require("../controllers/auth.controller")
const validate = require('../validators/validator')
const { registerSchema, loginSchema } = require('../validators/schemas/auth.schema')

router.get("/register",   validate(registerSchema), registerUser)
router.get("/login", validate(loginSchema), loginUser)

module.exports = router