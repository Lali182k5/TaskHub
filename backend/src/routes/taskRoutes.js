const express = require("express");

const createTaskRouter = ({ requireAuth, taskController }) => {
  const router = express.Router();

  router.use(requireAuth);

  router.get("/", taskController.listTasks);
  router.post("/", taskController.createTask);
  router.get("/:id", taskController.getTask);
  router.put("/:id", taskController.updateTask);
  router.delete("/:id", taskController.deleteTask);

  return router;
};

module.exports = {
  createTaskRouter,
};
