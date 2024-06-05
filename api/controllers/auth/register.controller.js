const bcrypt = require("bcrypt");
const { User } = require("../../models");

class RegisterController {
  register = async (req, res) => {
    //Getting data from user
    const { username, email, password } = req.body;

    try {
      //Encrypting password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //Creating new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      //Saving new User and Responding;
      await newUser.save();
      res.send({
        message: "User Registerd Successfully!! :):):):):)",
        status: 200,
      });
    } catch (error) {
        res.status(500).send(error);
    }
  };
}

module.exports = new RegisterController();
