const { Task } = require("../models/Task");
const { AppError } = require("../utils/AppError");
const { asyncHandler } = require("../utils/asyncHandler");

const parseDateOrThrow = (value, fieldName) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new AppError(`Invalid ${fieldName}`, 400);
  }
  return date;
};

const parseSort = (sort) => {
  if (!sort) return { createdAt: -1 };

  // Supported: dueDate:asc | dueDate:desc
  const [field, direction] = String(sort).split(":");
  if (field !== "dueDate") {
    throw new AppError("Invalid sort", 400);
  }

  if (direction === "asc") return { dueDate: 1, createdAt: -1 };
  if (direction === "desc") return { dueDate: -1, createdAt: -1 };

  throw new AppError("Invalid sort", 400);
};

const listTasks = asyncHandler(async (req, res) => {
  const filter = { owner: req.user.id };

  const { status, priority, dueAfter, dueBefore, sort } = req.query || {};

  if (status) filter.status = String(status);
  if (priority) filter.priority = String(priority);

  if (dueAfter || dueBefore) {
    filter.dueDate = {};
    if (dueAfter) filter.dueDate.$gte = parseDateOrThrow(dueAfter, "dueAfter");
    if (dueBefore) filter.dueDate.$lte = parseDateOrThrow(dueBefore, "dueBefore");
  }

  const sortSpec = parseSort(sort);

  const tasks = await Task.find(filter).sort(sortSpec);
  return res.status(200).json({ tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body || {};

  if (!title) {
    throw new AppError("Title is required", 400);
  }

  const parsedDueDate =
    dueDate === undefined || dueDate === null || dueDate === ""
      ? undefined
      : parseDateOrThrow(dueDate, "dueDate");

  const task = await Task.create({
    owner: req.user.id,
    title: String(title).trim(),
    description: description ? String(description).trim() : undefined,
    status,
    priority,
    dueDate: parsedDueDate,
  });

  return res.status(201).json({ task });
});

const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return res.status(200).json({ task });
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body || {};

  const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (title !== undefined) task.title = String(title).trim();
  if (description !== undefined) task.description = String(description).trim();
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) {
    task.dueDate =
      dueDate === null || dueDate === "" ? null : parseDateOrThrow(dueDate, "dueDate");
  }

  await task.save();
  return res.status(200).json({ task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!deleted) {
    throw new AppError("Task not found", 404);
  }
  return res.status(204).send();
});

module.exports = {
  listTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
