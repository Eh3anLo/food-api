const { z } = require("zod");

const createMenuSchema = z.object({
  name: z.string().min(2),

  description: z.string().min(5),

  price: z.number().positive({
    error: "قیمت باید بزرگتر از صفر باشد."
  }),

  category: z.enum([
    "غذای اصلی",
    "پیش غذا",
    "دسر",
    "نوشیدنی",
  ],{
    message: "category نا معتبر می باشد."
  }),

  isAvailable: z.boolean(),
});

const updateMenuSchema = createMenuSchema.partial();

module.exports = {
  createMenuSchema,
  updateMenuSchema,
};