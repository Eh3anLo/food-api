const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");
const validate = require("../validators/validator");
const {
  registerSchema,
  loginSchema,
} = require("../validators/schemas/auth.schema");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
