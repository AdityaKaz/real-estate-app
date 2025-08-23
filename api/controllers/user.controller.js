import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  console.log("Authenticated user data (req.user):", req.user);
  console.log("Request params id:", req.params.id);
  console.log("Request body:", req.body);

  if (req.user.id !== req.params.id) {
    console.log("User ID mismatch: unauthorized update attempt");
    return next(
      errorHandler(403, "You are only allowed to update your own profile")
    );
  }

  try {
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      photoUrl: req.body.photoUrl,
    };

    if (req.body.password) {
      console.log("Password provided, hashing...");
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found for ID:", req.params.id);
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...userData } = updatedUser._doc;

    console.log("User successfully updated:", userData);

    return res.status(200).json({
      status: "success",
      data: {
        user: userData,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log("Authenticated user data (req.user):", req.user);
  console.log("Request params id:", req.params.id);

  if (req.user.id !== req.params.id) {
    console.log("User ID mismatch: unauthorized delete attempt");
    return next(
      errorHandler(403, "You are only allowed to delete your own profile")
    );
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      console.log("User not found for ID:", req.params.id);
      return next(errorHandler(404, "User not found"));
    }

    console.log("User successfully deleted:", deletedUser._id);
    res.clearCookie("access_token");
    return res.status(200).json({
      status: "success",
      data: {
        user: deletedUser._id,
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return next(error);
  }
};
