const { z } = require("zod");

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        menuItemId: z.number().int().positive(),

        quantity: z.number().int().positive({
          error: "تعداد نمیتواند صفر یا کمتر باشد",
        }),
      }),
    )
    .min(1, {
      error: "تعداد سفارش نمیتواند صفر یا کمتر باشد",
    }),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(
    ["PENDING", "CONFIRMED", "PREPARING", "DELIVERED", "CANCELLED"],
    {
      message: "وضعیت سفارش وارد شده نامعتبر می باشد",
    },
  ),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};
