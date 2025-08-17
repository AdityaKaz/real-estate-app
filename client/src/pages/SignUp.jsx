import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (
          data.message?.includes("duplicate key") ||
          data.message?.includes("email already exists")
        ) {
          setError("Email already registered. Try signing in instead.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        setLoading(false);
        return;
      }
      setLoading(false);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setError(null);
      navigate("/sign-in");
    } catch (err) {
      setError("Unable to connect to the server. Please check your internet.");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder:text-slate-400 caret-blue-500 transition"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder:text-slate-400 caret-blue-500 transition"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder:text-slate-400 caret-blue-500 transition"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase font-medium
                     hover:bg-slate-800 focus:outline-none focus:ring-2
                     focus:ring-blue-400 disabled:opacity-70 transition"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Have an account?{" "}
          <Link to="/sign-in" className="text-blue-700 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SignUp;
