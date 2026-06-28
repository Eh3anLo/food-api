const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const validate = require("../validators/validator");
const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require("../validators/schemas/order.schema");

router
  .route("/")
  .post(
    authenticate,
    authorize("USER"),
    validate(createOrderSchema),
    orderController.createOrder,
  )
  .get(authenticate, authorize("ADMIN"), orderController.allOrders);

router.get("/my", authenticate, authorize("USER"), orderController.myOrder);
module.exports = router;

router.get("/:id", authenticate, orderController.orderById);
router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  validate(updateOrderStatusSchema),
  orderController.orderStatus,
);
