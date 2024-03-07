import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { firstName, email, password } = req.body;
  try {
    const emailVerification = await User.findOne({ email: email });
    if (emailVerification) return res.json("Email already taken");

    const generateSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, generateSalt);

    const user = new User({
      first_name: firstName,
      email: email,
      password: hashPassword,
    });
    user.save();
    res.send("Welcome" + user.firstName);
  } catch (error) {
    res.json(error);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.json("Email or Password incorrect");

    const comparePassword = await bcrypt.compareSync(password, user.password);
    if (!comparePassword) return res.json("Email or Password incorrect");

    const token = jwt.sign(
      { id: user._id, firstName: user.first_name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.header("auth-token", token);
  } catch (error) {
    res.json(error);
  }
});

export default authRouter;
