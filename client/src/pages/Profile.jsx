import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { updateUserProfile } from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // State to track if editing or viewing
  const [isEditing, setIsEditing] = useState(false);

  // Store original data for canceling edits
  const [originalData, setOriginalData] = useState({
    photoUrl: currentUser.photoUrl,
    username: currentUser.username,
    email: currentUser.email,
  });

  const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = async (e) => {
    if (!isEditing) return; // Prevent upload if not editing

    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);

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
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      handleSubmit();
    } else {
      // Enter edit mode, save original data
      setOriginalData({ photoUrl, username, email });
      setIsEditing(true);
      setUploadSuccess(false);
    }
  };

  const handleSubmit = () => {
    const updatedUser = {
      photoUrl,
      username,
      email,
      password,
    };

    dispatch(updateUserProfile(updatedUser));
    setIsEditing(false);
    setPassword("");
    setUploadSuccess(false);
  };

  const handleCancel = () => {
    // Revert changes to original data and exit edit mode
    setPhotoUrl(originalData.photoUrl);
    setUsername(originalData.username);
    setEmail(originalData.email);
    setPassword("");
    setUploadSuccess(false);
    setIsEditing(false);
  };

  // Common handler to update fields and clear upload success message
  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
    setUploadSuccess(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEditing) handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
          disabled={!isEditing}
        />
        <img
          onClick={() => {
            if (isEditing) fileInputRef.current.click();
          }}
          src={photoUrl}
          alt="Profile"
          className={`self-center w-32 h-32 rounded-full object-cover ${
            isEditing ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        />
        <div className="h-1 flex justify-center items-center mt-2">
          {uploading && <p className="text-blue-600">Uploading image...</p>}
          {uploadSuccess && !uploading && (
            <p className="text-green-600">Upload successful!</p>
          )}
        </div>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border border-slate-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 caret-blue-500 transition"
          value={username}
          onChange={handleFieldChange(setUsername)}
          disabled={!isEditing}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border border-slate-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 caret-blue-500 transition"
          value={email}
          onChange={handleFieldChange(setEmail)}
          disabled={!isEditing}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border border-slate-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 caret-blue-500 transition"
          value={password}
          onChange={handleFieldChange(setPassword)}
          disabled={!isEditing}
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleEditToggle}
            className="flex-1 bg-slate-700 text-white p-3 rounded-lg uppercase font-medium hover:bg-slate-800 focus:outline-none transition"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-black-700 p-3 rounded-lg uppercase font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
