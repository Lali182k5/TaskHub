const mongoose = require("mongoose");

const connectDb = async (mongoDbUri) => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoDbUri);
};

module.exports = {
  connectDb,
};
