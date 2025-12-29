require("dotenv").config();

const { createApp } = require("./app");
const { connectDb } = require("./config/db");
const { getEnv } = require("./config/env");

const start = async () => {
  const env = getEnv();

  await connectDb(env.mongoDbUri);
  console.log("MongoDB connected");

  const app = createApp({ env });

  app.listen(env.port, () => {
    // Intentionally avoid logging secrets
    console.log(`API listening on port ${env.port}`);
  });
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
