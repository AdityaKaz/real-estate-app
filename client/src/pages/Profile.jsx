import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { updateUserProfile } from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setPhotoUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      photoUrl,
      username,
      email,
      password,
    };

    dispatch(updateUserProfile(updatedUser));
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={() => fileInputRef.current.click()}
          src={photoUrl}
          alt="Profile"
          className="self-center w-32 h-32 rounded-full object-cover cursor-pointer"
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border border-slate-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 caret-blue-500 transition"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border border-slate-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 caret-blue-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border border-slate-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 caret-blue-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-70 transition"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
