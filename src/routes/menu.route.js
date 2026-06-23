const express = require("express")
const menuController = require("../controllers/menu.controller")
const { authenticate } = require("../middlewares/auth.middleware")
const { authorize } = require("../middlewares/role.middleware")
const router = express.Router()

router.route("/").get(menuController.getMenu).post(authenticate,authorize("ADMIN"),menuController.createMenuItem)
router.route("/:id").get(menuController.getMenuItem)

module.exports = router