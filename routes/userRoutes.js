const express = require("express");
const router = express.Router();
const {
  autheticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const userController = require("../controllers/userController");

router
  .route("/")
  .get(
    autheticateUser,
    authorizePermissions("admin", "user"),
    userController.getAllUsers
  );

router.route("/showMe").get(userController.showCurrentUser);

router.route("/updateUser").post(userController.updateUser);

router.route("/updateUserPassword").post(userController.updateUserPassword);

router.route("/:id").get(autheticateUser, userController.getSingleUser);

module.exports = router;
