import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { signUpWithEmail } from "../utils/authenticator/authServices";
import {
  WatchlistContext,
  WatchlistProvider,
} from "../context/watchListContext";

export function SignUp() {
  const { passedemail } = useParams();
  const [email, setEmail] = useState(passedemail);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, logout } = useContext(WatchlistContext);

  console.log("Received email:", passedemail);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("email : ", email);
      const response = await signUpWithEmail(email, password);
      console.log("Login response:", response);
      login(email);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      logout();
      navigate("/");
      return error;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <form
        className="flex flex-col text-white gap-2 w-full max-w-2xl px-4"
        onSubmit={(e) => handleSignup(e)}
      >
        <input
          type="email"
          value={passedemail}
          placeholder="email"
          required
          className="flex-grow bg-black/90 border border-zinc-500 rounded-md px-4 py-4 text-lg focus:ring-2 ring-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          required
          className="flex-grow bg-black/90 border border-zinc-500 rounded-md px-4 py-4 text-lg focus:ring-2 ring-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-8 py-3 rounded-md text-xl md:text-2xl font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
}
