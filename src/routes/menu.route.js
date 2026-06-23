const express = require("express")
const menuController = require("../controllers/menu.controller")
const router = express.Router()

router.route("/").get(menuController.getMenu)
router.route("/:id").get(menuController.getMenuItem)

module.exports = router