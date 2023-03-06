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
    authorizePermissions("admin"),
    userController.getAllUsers
  );

router.route("/showMe").get(autheticateUser, userController.showCurrentUser);

router.route("/updateUser").patch(userController.updateUser);

router
  .route("/updateUserPassword")
  .patch(autheticateUser, userController.updateUserPassword);

router.route("/:id").get(autheticateUser, userController.getSingleUser);

module.exports = router;
