const express = require("express");
const menuController = require("../controllers/menu.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const validate = require("../validators/validator");
const { createMenuSchema, updateMenuSchema } = require("../validators/schemas/menu.schema");
const router = express.Router();

router
  .route("/")
  .get(menuController.getMenu)
  .post(authenticate, authorize("ADMIN"),validate(createMenuSchema), menuController.createMenuItem);
router
  .route("/:id")
  .get(menuController.getMenuItem)
  .put(authenticate, authorize("ADMIN"),validate(updateMenuSchema) ,menuController.updateMenuItem)
  .delete(authenticate, authorize("ADMIN"), menuController.deleteMenuItem)

module.exports = router;
