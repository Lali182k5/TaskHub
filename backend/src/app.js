const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const { requireAuth } = require("./middleware/auth");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

const { register, login, me } = require("./controllers/authController");
const taskController = require("./controllers/taskController");

const { createAuthRouter } = require("./routes/authRoutes");
const { createTaskRouter } = require("./routes/taskRoutes");

const createApp = ({ env }) => {
  const app = express();

  app.disable("x-powered-by");

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: false,
    })
  );

  if (env.nodeEnv !== "production") {
    app.use(morgan("dev"));
  }

  app.use(express.json({ limit: "64kb" }));

  app.get("/health", (req, res) => res.status(200).json({ ok: true }));

  const authGuard = requireAuth(env.jwtSecret);

  const authController = {
    register: register({ jwtSecret: env.jwtSecret, jwtExpiresIn: env.jwtExpiresIn }),
    login: login({ jwtSecret: env.jwtSecret, jwtExpiresIn: env.jwtExpiresIn }),
    me,
  };

  app.use(
    "/api/auth",
    createAuthRouter({
      requireAuth: authGuard,
      authController,
    })
  );

  app.use(
    "/api/tasks",
    createTaskRouter({
      requireAuth: authGuard,
      taskController,
    })
  );

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = {
  createApp,
};
