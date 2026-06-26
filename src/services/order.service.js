const prisma = require("../config/prisma");

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
      const error = new Error("Menu item not found");
      error.status = 404;
      throw error;
    }

    if (!menuItem.isAvailable) {
      const error = new Error(`${menuItem.name} is not available`);
      error.status = 400;
      throw error;
    }

    if (item.quantity <= 0) {
      const error = new Error("Quantity must be greater than zero");
      error.status = 400;
      throw error;
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

  console.log("FROM SERVICE: ", order)
  return order
}

module.exports = { createOrder };
