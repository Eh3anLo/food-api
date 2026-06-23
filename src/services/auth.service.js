require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { configDotenv } = require("dotenv");

async function register(data) {
  const { name, email, password } = data;

  const role = data.role || "USER";

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    // handle error and return
    const error = new Error("حساب کاربری با ایمیل وجود دارد.");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      email,
      role,
    },
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return { token };
}

async function login(email, pass) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const error = new Error("کاربر یافت نشد");
    error.status = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(pass, user.password);

  if (!isPasswordValid) {
    const error = new Error("ایمیل یا رمز عبور نامعتبر است.");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return { user, token };
}

module.exports = { register, login };
