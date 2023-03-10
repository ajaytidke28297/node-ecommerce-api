const CustomAPIError = require("../errors");
const { isTokenValid } = require("../utils");

const autheticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomAPIError.UnauthenticatedError("Authentication invalid");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomAPIError.UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomAPIError.UnauthorizedError(
        "Unauthroized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  autheticateUser,
  authorizePermissions,
};
