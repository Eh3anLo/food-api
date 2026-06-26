const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const {authenticate} = require("../middlewares/auth.middleware");
const {authorize} = require("../middlewares/role.middleware");

router.post(
  "/",
  authenticate,
  authorize("USER"),
  orderController.createOrder
);

router.get("/my", authenticate, authorize("USER"), orderController.myOrder)
module.exports = router;