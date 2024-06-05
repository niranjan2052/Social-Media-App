const express = require("express");
const { User } = require("../../controllers");

const router = express.Router();

router.route("/").get(User.UserController.index);

router
  .route("/:id")
  .patch(User.UserController.update)
  .put(User.UserController.update)
  .delete(User.UserController.destroy);

router.route("/friends/:userId").get(User.UserController.getFriends);

router.route("/:id/follow").put(User.UserController.follow);
router.route("/:id/unfollow").put(User.UserController.unfollow);

module.exports = router;
