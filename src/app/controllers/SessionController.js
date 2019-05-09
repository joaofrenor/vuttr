const User = require("../models/User");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User user does not exist or wrong password" });
    }

    if (!(await user.compareHash(password))) {
      return res
        .status(400)
        .json({ error: "User user does not exist or wrong password" });
    }

    return res.json({ token: User.generateToken(user) });
  }
}

module.exports = new SessionController();
