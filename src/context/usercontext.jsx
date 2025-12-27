// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange } from "../utils/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [movieId, setMovieId] = useState(null);
  //
  // console.log("AuthProvider rendered, user:", user, "loading:", loading);
  // useEffect(() => {
  //   const unsubscribe = onAuthChange((currentUser: User) => {
  //     console.log("Auth state changed, currentUser:", currentUser);
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //
  //   console.log("Subscribed to auth changes");
  //   return () => unsubscribe();
  // }, []);
  //
  const value = {
    user: user,
    setUser: setUser,
    loading: loading,
    setLoading: setLoading,
    error: error,
    setError: setError,
    email: email,
    setEmail: setEmail,
    movieId: movieId,
    setMovieId: setMovieId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
//
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === null) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
