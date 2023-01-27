const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const CustomError = require("../errors/");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const isEmailExists = await User.findOne({ email });
  if (isEmailExists)
    throw new CustomError.BadRequestError("Email already exists");

  // First registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, name, password, role });
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send("Login");
};
const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
