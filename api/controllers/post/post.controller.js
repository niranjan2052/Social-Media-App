const { Post, User } = require("../../models");

class PostController {
  //Method to create a post
  store = async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).send(savedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  //Method to update a post
  update = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (req.body.userId == post.userId) {
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).send("Your Post has been updated");
      } else {
        res.status(403).send("You can't update other's post");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //Method to delete a post
  destory = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (req.body.userId == post.userId) {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).send("Your Post has been deleted");
      } else {
        res.status(403).send("You can't delete other's post");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //Method to like a post
  like = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.send("You have liked this Post");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.send("You have disliked this Post");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //Method to get a post by Id
  showById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //Method to get a post by Name
  showByName = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  //Method to get timeline posts
  index = async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).send(userPosts.concat(...friendPosts));
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new PostController();
