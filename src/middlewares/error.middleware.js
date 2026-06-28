function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;