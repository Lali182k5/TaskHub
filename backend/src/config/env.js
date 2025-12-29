const required = (name) => {
  const value = process.env[name];
  if (!value) {
    const err = new Error(`Missing required environment variable: ${name}`);
    err.statusCode = 500;
    throw err;
  }
  return value;
};

const getEnv = () => {
  const nodeEnv = process.env.NODE_ENV || "development";

  return {
    nodeEnv,
    port: Number(process.env.PORT || 5000),
    mongoDbUri: required("MONGODB_URI"),
    jwtSecret: required("JWT_SECRET"),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  };
};

module.exports = {
  getEnv,
};
