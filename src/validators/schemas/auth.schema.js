const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(3).max(100),

  email: z.email({
    error: "ایمیل نامعتبر است.",
  }),

  password: z.string().min(8, {
    error: "رمز عبور حداقل باید 8 کاراکتر باشد."
  }),

  role: z.enum(["USER", "ADMIN"], {
    message: "نقش کاربر نامعتبر است"
  }).optional(),
});

const loginSchema = z.object({
  email: z.email({
    error: "ایمیل نامعتبر است.",
  }),

  password: z.string().min(8,{
    error: "رمز عبور حداقل باید 8 کاراکتر باشد."
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};