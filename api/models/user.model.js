import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: "https://avatar.iran.liara.run/public/48",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
