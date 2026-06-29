require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { configDotenv } = require("dotenv");
const ApiError = require("../utils/ApiError");
const { application } = require("express");


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
    throw new ApiError(409, "حساب کاربری با این ایمیل وجود دارد")
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
    throw new ApiError(404, "کاربر یافت نشد");
  }

  const isPasswordValid = await bcrypt.compare(pass, user.password);

  if (!isPasswordValid) {
     throw new ApiError(401,"ایمیل یا رمز عبور صحیح نمی باشد")
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
