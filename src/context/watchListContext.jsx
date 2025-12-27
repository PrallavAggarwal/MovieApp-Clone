import { createContext } from "react";
import { useState, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  // 1. Handle Login Simulation
  useEffect(() => {
    const savedUser = localStorage.getItem("active_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to restore user session", e);
        setCurrentUser(null);
      }
    }
  }, []);

  const login = (email) => {
    const user = { email };
    setCurrentUser(user);
    // Save active user session to localStorage
    localStorage.setItem("active_user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setWatchlist([]);
    localStorage.removeItem("active_user");
  };

  // 2. Load user-specific watchlist from localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      const storageKey = `watchlist_${currentUser.email}`;
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        try {
          setWatchlist(JSON.parse(savedData));
        } catch (e) {
          console.error("Failed to parse user watchlist", e);
          setWatchlist([]);
        }
      } else {
        setWatchlist([]);
      }
    } else {
      setWatchlist([]);
    }
  }, [currentUser]);

  // 3. Save to user-specific localStorage whenever the watchlist state updates
  useEffect(() => {
    if (currentUser) {
      const storageKey = `watchlist_${currentUser.email}`;
      localStorage.setItem(storageKey, JSON.stringify(watchlist));
      console.log(watchlist);
    }
  }, [watchlist, currentUser]);

  const toggleWatchlist = (movieObj) => {
    if (!currentUser) return;
    setWatchlist((prev) => {
      const exists = prev.find((item) => item.id === movieObj.id);
      if (exists) {
        return prev.filter((item) => item.id !== movieObj.id);
      } else {
        return [...prev, movieObj];
      }
    });
  };

  const isInWatchlist = (movieId) =>
    watchlist.some((item) => item.id === movieId);

  const value = {
    login: login,
    logout: logout,
    setCurrentUser: setCurrentUser,
    currentUser: currentUser,
    toggleWatchlist: toggleWatchlist,
    isInWatchlist: isInWatchlist,
    watchlist: watchlist,
    setWatchlist: setWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
