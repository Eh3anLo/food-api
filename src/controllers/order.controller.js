const orderService = require("../services/order.service");

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(req.user.id, req.body.items);
    console.log("FROM CONTROLLER : ", order);

    res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.send(error);
  }
}

async function myOrder(req, res, next) {
  try {
    const id = Number(req.user.id);
    const myOrders = await orderService.getMyOrder(id);

    res.status(200).json({
      status: "sucess",
      data: myOrders,
    });
  } catch (error) {
    res.send(error);
  }
}

async function orderById(req, res, next) {
  try {
    const orderId = Number(req.params.id);
    const reqUser = req.user;

    const order = await orderService.getOrderById(orderId, reqUser);

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.send(error);
  }
}

async function allOrders(req, res, next) {
  try {
    const allOrders = await orderService.getAllOrders();

    res.status(200).json({
      status: "success",
      data: allOrders,
    });
  } catch (error) {
    res.send(error);
  }
}

async function orderStatus(req, res, next) {
  try {
    const orderId = Number(req.params.id);

    if (Number.isNaN(orderId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid order id",
      });
    }

    const { status } = req.body;

    const order = await orderService.updateOrderStatus(orderId, status);

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  myOrder,
  orderById,
  allOrders,
  orderStatus
};
