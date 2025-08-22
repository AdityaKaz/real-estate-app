import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.photoUrl}
          alt="Profile"
          className="self-center w-32 h-32 rounded-full object-cover cursor-pointer"
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder:text-slate-400 caret-blue-500 transition"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder:text-slate-400 caret-blue-500 transition"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder:text-slate-400 caret-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg shadow-md
                     hover:bg-blue-500 transition disabled:opacity-80"
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
