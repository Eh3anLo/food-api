const prisma = require("../config/prisma");
const { mapOrderResponse } = require("../utils/order.mapper");
const { getAllMenuItems } = require("./menu.service");
const ApiError = require("../utils/ApiError");

async function createOrder(userId, items) {
  let totalPrice = 0;
  const orderItemsData = [];

  // check items length in controller
  // menuItemId, quantity

  const ids = items.map((item) => item.menuItemId);
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const menuItemsMap = new Map(
    menuItems.map((menuItem) => [menuItem.id, menuItem]),
  );

  for (const item of items) {
    const menuItem = menuItemsMap.get(item.menuItemId);

    if (!menuItem) {
      throw new ApiError(404, "آیتم یافت نشد");
    }

    if (!menuItem.isAvailable) {
      throw new ApiError(400, `${menuItem.name} موجود نمی باشد`);
    }

    if (item.quantity <= 0) {
      throw new ApiError(400, "تعداد باید بزرگتر از صفر باشد");
    }

    totalPrice += menuItem.price * item.quantity;

    orderItemsData.push({
      menuItemId: menuItem.id,
      quantity: item.quantity,
      price: menuItem.price,
      name: menuItem.name,
    });
  }

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        totalPrice,
      },
    });

    await tx.orderItem.createMany({
      data: orderItemsData.map((item) => ({
        orderId: createdOrder.id,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    return {
      order_id: createdOrder.id,
      total_price: totalPrice,
      status: createdOrder.status,
      items: orderItemsData.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  });

  console.log("FROM SERVICE: ", order);
  return order;
}

async function getMyOrder(id) {
  const myOrders = await prisma.order.findMany({
    where: {
      userId: id,
    },
    include: {
      items: {
        select: {
          quantity: true,
          price: true,
          menuItem: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return myOrders.map((order) => ({
    order_id: order.id,
    total_price: order.totalPrice,
    status: order.status.toLowerCase(),
    created_at: order.created_at,
    items: order.items.map((item) => ({
      name: item.menuItem.name,
      quantity: item.quantity,
      price: item.price,
    })),
  }));
}

async function getOrderById(orderId, reqUser) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        select: {
          quantity: true,
          price: true,
          menuItem: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  console.log(order);

  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw new ApiError(404, "سفارش یافت نشد");
  }

  if (reqUser.role === "USER" && order.userId !== reqUser.id) {
    const error = new Error("Forbbiden");
    error.status = 403;
    throw new ApiError(403, "شما دسترسی به این بخش ندارید");
  }

  return mapOrderResponse(order);
}

async function getAllOrders() {
  const orders = await prisma.order.findMany({
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      created_at: true,
      status: true,
      totalPrice: true,
      items: {
        select: {
          quantity: true,
          price: true,
          menuItem: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return orders;
}

const allowedTransitions = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

async function updateOrderStatus(orderId, status) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new ApiError(404, "سفارش یافت نشد");
  }

  const allowed = allowedTransitions[order.status];

  if (!allowed.includes(status)) {
    throw new ApiError(
      400,
      `Cannot change status from ${order.status} to ${status}`,
    );
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  return {
    order_id: updatedOrder.id,
    total_price: updatedOrder.totalPrice,
    status: updatedOrder.status,
  };
}
module.exports = {
  createOrder,
  getMyOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
