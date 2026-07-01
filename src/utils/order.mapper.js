function mapOrderResponse(order) {
  return {
    order_id: order.id,
    user: order.user,
    total_price: order.totalPrice,
    status: order.status.toLowerCase(),
    created_at: order.created_at,
    items: order.items.map((item) => ({
      name: item.menuItem.name,
      quantity: item.quantity,
      price: item.price,
    })),
  };
}


module.exports = { mapOrderResponse }