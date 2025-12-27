import { useState, useEffect } from "react";
import { useDebounce } from "../utils/customHooks/useDebounce.jsx";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Debounced value changed:", debouncedValue);
    async function fetchData() {
      try {
        const url =
          "https://api.imdbapi.dev/search/titles?query=" + debouncedValue;
        const reponse = await fetch(url);
        const data = await reponse.json();
        setData(data.titles);
        console.log(data.titles);
      } catch (error) {
        setData(null);
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [debouncedValue]);

  console.log("data : ", data);

  return (
    <div className="relative z-40 ">
      <input
        placeholder="show name"
        className="flex-grow bg-black/90 border border-zinc-500 rounded-md px-2 py-1 text-md focus:ring-2 ring-white outline-none placeholder:text-neutral-600 text-white font-medium "
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {data && isOpen && (
        <div className="absolute z-20 flex flex-col text-white inset-x-0 top-10 max-h-40 overflow-y-hidden py-3 rounded-md px-2 h-screen bg-neutral-500 border border-r-neutral-700">
          {data.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                let url = "/preview/" + encodeURIComponent(movie.id);
                navigate(url);
              }}
              className="cursor-pointer"
            >
              {movie.originalTitle}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
