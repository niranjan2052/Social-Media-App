const { User } = require("../../models");
const bcrypt = require("bcrypt");
class UserController {
  //Get Friends
  getFriends = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  //method to show all users
  index = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, ...other } = user._doc;
      res.status(200).send(other);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  //Method To update User Details
  update = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          return res.status(500).send(error);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.send("User Account has been updated");
      } catch (error) {
        return res.status(500).send(error);
      }
    } else {
      res.status(401).send("You can Update only your account");
    }
  };

  //Method to Delete User using id
  destroy = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.send("User Deleted Successfully!! :):):)");
      } catch (error) {
        return res.status(500).send(error);
      }
    } else {
      res.status(401).send("You can Delete only your account");
    }
  };

  //Method to follow a user
  follow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("You are now following the user");
      } else {
        res.status(403).send("You are already following the user");
      }
    } else {
      res.status(403).send("You can't follow yourself");
    }
  };
  //Method to unfollow a user
  unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).send("You have now unfollow the user");
      } else {
        res.status(403).send("You are not following the user");
      }
    } else {
      res.status(403).send("You can't unfollow yourself");
    }
  };
}

module.exports = new UserController();
