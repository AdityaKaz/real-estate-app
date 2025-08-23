import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      dispatch(signInFailure(null));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) {
      dispatch(signInFailure(null));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Sign in failed."));
        return;
      }

      dispatch(signInSuccess(data));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      dispatch(
        signInFailure(
          "Unable to connect to the server. Please check your internet."
        )
      );
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      placeholder:text-slate-400 caret-blue-500 transition"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      placeholder:text-slate-400 caret-blue-500 transition"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase font-medium
                      hover:bg-slate-800 focus:outline-none disabled:opacity-70 transition"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
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
