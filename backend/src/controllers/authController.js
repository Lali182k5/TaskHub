const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { AppError } = require("../utils/AppError");
const { asyncHandler } = require("../utils/asyncHandler");

const signToken = ({ userId, jwtSecret, jwtExpiresIn }) => {
  return jwt.sign({}, jwtSecret, {
    subject: String(userId),
    expiresIn: jwtExpiresIn,
  });
};

const register = ({ jwtSecret, jwtExpiresIn }) =>
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body || {};

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      throw new AppError("Email already in use", 409);
    }

    const passwordHash = await User.hashPassword(String(password));

    const user = await User.create({
      name: name ? String(name).trim() : undefined,
      email: String(email).toLowerCase().trim(),
      passwordHash,
    });

    const token = signToken({ userId: user._id, jwtSecret, jwtExpiresIn });

    return res.status(201).json({
      token,
      user: {
        id: String(user._id),
        name: user.name || "",
        email: user.email,
      },
    });
  });

const login = ({ jwtSecret, jwtExpiresIn }) =>
  asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const ok = await user.verifyPassword(String(password));
    if (!ok) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = signToken({ userId: user._id, jwtSecret, jwtExpiresIn });

    return res.status(200).json({
      token,
      user: {
        id: String(user._id),
        name: user.name || "",
        email: user.email,
      },
    });
  });

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("name email");
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  return res.status(200).json({
    user: {
      id: String(user._id),
      name: user.name || "",
      email: user.email,
    },
  });
});

module.exports = {
  register,
  login,
  me,
};
