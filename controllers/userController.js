const User = require("../models/User");
const CustomAPIError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  if (users === []) {
    throw new CustomAPIError.NotFoundError("No users found");
  }
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomAPIError.NotFoundError("No users found");
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = (req, res) => {
  res.send("Get active user");
};

const updateUser = (req, res) => {
  res.send("Get update user");
};

const updateUserPassword = (req, res) => {
  res.send("Get update password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
