require("dotenv").config();

const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "باید وارد شوید",
      });
    }

    const token = authHeader.split(" ")[1]; // Authorization: Bearer <token>

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Invalid or expired token, login again",
    });
  }
}

// !NOTE we dont need async/await mechanisme

module.exports = { authenticate };
