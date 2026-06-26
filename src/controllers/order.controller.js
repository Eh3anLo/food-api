const orderService = require("../services/order.service");

async function createOrder(req, res, next) {
  try {

    const order = await orderService.createOrder(
      req.user.id,
      req.body.items
    );
    console.log("FROM CONTROLLER : ",order)

    res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  createOrder,
};