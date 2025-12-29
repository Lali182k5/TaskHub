const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/AppError");

const requireAuth = (jwtSecret) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized", 401));
    }

    const token = authHeader.slice("Bearer ".length).trim();
    try {
      const payload = jwt.verify(token, jwtSecret);
      req.user = { id: payload.sub };
      return next();
    } catch {
      return next(new AppError("Unauthorized", 401));
    }
  };
};

module.exports = {
  requireAuth,
};
