import { NetflixLogo } from "../assets/netflixLogo.jsx";
import { useDebounce } from "../utils/customHooks/useDebounce.jsx";
import { useState, useEffect } from "react";
import { SearchBar } from "./searchBar.jsx";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <nav className="relative z-10 flex items-center overflow-hidden justify-between px-4 py-4 md:px-12 max-w-[1421px] mx-auto h-22 ">
      <div className="flex items-center h-full w-full ">
        <NetflixLogo className="h-10 w-auto" />
      </div>
      <div className="flex gap-2 items-center">
        <SearchBar />
        <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-1.5 rounded text-sm font-bold">
          Guest
        </button>
        <button
          onClick={() => navigate("/signin")}
          className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-1.5 rounded text-sm font-bold w-full"
        >
          SignIn
        </button>
      </div>
    </nav>
  );
}
