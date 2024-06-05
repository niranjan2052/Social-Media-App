const bcrypt = require("bcrypt");
const { User } = require("../../models");

class LoginController {
  login = async (req, res) => {
    //Getting data from user
    const { email, password } = req.body;

    try {
      //Finding user
      const user = await User.findOne({ email });
      if (user) {
        //Decrypting password
        const validPassword = await bcrypt.compare(password, user.password);
        //Checking if the password is valid or not then responding for invalid password
        !validPassword &&
          res.status(400).send({ message: "Password not valid", status: 400 });
        //Response after valid user and password
        res.status(200).send(user);
      } else {
        res.status(404).send({
          message: "User Not Found!!",
          status: 404,
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new LoginController();
