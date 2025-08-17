import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
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
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.message?.includes("invalid credentials")) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        setLoading(false);
        return;
      }
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
      setError(null);
      navigate("/");
    } catch (err) {
      setError("Unable to connect to the server. Please check your internet.");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Dont have an account?{" "}
          <Link to="/sign-up" className="text-blue-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SignIn;
