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
    res.send(error)
  }
}

module.exports = {
  createOrder,
  myOrder,
  orderById
};
