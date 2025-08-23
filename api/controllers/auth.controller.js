import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    const { password: pass, _id, ...userData } = newUser._doc;
    res.status(201).json({
      message: "User signed up successfully",
      user: { id: _id, ...userData },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, _id, ...userData } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ id: _id, ...userData });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { name, email, photoUrl } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, _id, ...userData } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ id: _id, ...userData });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Generate unique username
      const generatedUsername =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const newUser = new User({
        username: generatedUsername,
        email,
        password: hashedPassword,
        photoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, _id, ...userData } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(201)
        .json({ id: _id, ...userData });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({
      status: "success",
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};
