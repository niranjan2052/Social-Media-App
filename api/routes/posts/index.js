const express = require("express");
const { Post } = require("../../controllers");
const router = express.Router();

router.route("/").post(Post.PostController.store);

router.route("/timeline/:userId").get(Post.PostController.index);
router.route("/profile/:username").get(Post.PostController.showByName);
router
  .route("/:id")
  .get(Post.PostController.showById)
  .patch(Post.PostController.update)
  .delete(Post.PostController.destory);

router.route("/:id/like").put(Post.PostController.like);

module.exports = router;
