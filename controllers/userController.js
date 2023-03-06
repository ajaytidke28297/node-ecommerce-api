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
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = (req, res) => {
  res.send("Get update user");
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomAPIError.BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError("Invalid Credentials");
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({});
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
