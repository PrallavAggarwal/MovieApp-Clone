import { useContext, useState } from "react";
import { loginWithEmail } from "../utils/authenticator/authServices";
import { useNavigate } from "react-router-dom";
import { WatchlistContext } from "../context/watchListContext";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, logout, currentUser, setCurrentUser } =
    useContext(WatchlistContext);

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginWithEmail(email, password);
      console.log("Login response:", response);
      setCurrentUser(email);
      navigate("/home");
      login(email);
      console.log(currentUser);
    } catch (error) {
      console.error("Error during login:", error);
      logout();
      navigate("/hero");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <form
        className="flex flex-col text-white gap-2 w-full max-w-2xl px-4"
        onSubmit={(e) => handlelogin(e)}
      >
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow bg-black/90 border border-zinc-500 rounded-md px-4 py-4 text-lg focus:ring-2 ring-white outline-none"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="flex-grow bg-black/90 border border-zinc-500 rounded-md px-4 py-4 text-lg focus:ring-2 ring-white outline-none"
        />
        <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-8 py-3 rounded-md text-xl md:text-2xl font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-lg">
          Sign In
        </button>
      </form>
    </div>
  );
}
