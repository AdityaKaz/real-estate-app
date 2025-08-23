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
      default:
        "https://t4.ftcdn.net/jpg/16/09/59/37/360_F_1609593795_Ae1PPBgGSiy2tKw4GWXeXJtBTQn3dWpn.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
