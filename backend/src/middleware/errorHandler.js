const errorHandler = (err, req, res, next) => {
  const statusCode = Number(err.statusCode || 500);

  if (process.env.NODE_ENV === "production") {
    const safeStatus = statusCode >= 400 && statusCode < 600 ? statusCode : 500;
    return res.status(safeStatus).json({
      message: safeStatus === 500 ? "Internal server error" : err.message,
    });
  }

  return res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  errorHandler,
};
