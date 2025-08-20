import google_logo from "../assets/google-logo.svg";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded with ${res.status}: ${text}`);
      }
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="flex items-center justify-center gap-2 bg-white border border-gray-400 shadow-sm p-3 rounded-lg uppercase font-medium
                 hover:bg-gray-100 focus:outline-none focus:ring-2
                 focus:ring-blue-400 disabled:opacity-70 transition"
    >
      <img src={google_logo} alt="Google" className="w-5 h-5" />
      Continue with Google
    </button>
  );
};

export default OAuth;
