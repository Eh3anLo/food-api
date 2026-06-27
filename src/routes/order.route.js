const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router
  .route("/")
  .post(authenticate, authorize("USER"), orderController.createOrder)
  .get(authenticate, authorize("ADMIN"), orderController.allOrders)

router.get("/my", authenticate, authorize("USER"), orderController.myOrder);
module.exports = router;

router.get("/:id", authenticate, orderController.orderById);
router.patch("/:id/status", authenticate, authorize("ADMIN"), orderController.orderStatus)
