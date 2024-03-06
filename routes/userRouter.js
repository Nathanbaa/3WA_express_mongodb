import express from "express";
import User from "../models/user.js";
const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err.message);
  }
});

userRouter.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err.message);
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const userbyId = await User.findById(req.params.id);
    res.json(userbyId);
  } catch (err) {
    console.log(err.message);
  }
});

userRouter.put("/users/:id", async (req, res) => {
  try {
    const userToUpdateById = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(userToUpdateById);
  } catch (err) {
    console.log(err.message);
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json("User has been deleted");
  } catch (err) {
    console.log(err.message);
  }
});

export default userRouter;
