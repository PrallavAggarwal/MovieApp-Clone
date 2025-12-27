import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "./searchBar";
import { topMovies } from "../utils/queryOptions/topmovies";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { data, isError, isSuccess, isLoading } = useQuery(topMovies());
  console.log(data);

  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen h-auto overflow-y-auto text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-10 py-4 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 text-2xl font-extrabold">NETFLIX</h1>
          <ul className="hidden md:flex gap-6 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/tvshows")}
            >
              TV Shows
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/movies")}
            >
              Movies
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/popular")}
            >
              New & Popular
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/watchlist")}
            >
              My List
            </li>
            <li className="hover:text-white cursor-pointer">
              Browse by Languages
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <SearchBar />
          <span className="text-xl cursor-pointer">🔔</span>
          <div
            className="w-8 h-8 bg-purple-600 rounded-md"
            onClick={() => navigate("/profile")}
          >
            Profile
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full">
        {isSuccess && (
          <div className="relative h-full w-full">
            <img
              src={data.titles[0].primaryImage.url}
              alt={data.titles[0].primaryTitle}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

            <div className="relative z-10 pt-40 px-10 max-w-xl">
              <p className="text-sm text-gray-300 mb-2">N SERIES</p>
              <h1 className="text-6xl font-extrabold leading-tight mb-4">
                {data.titles[0].primaryTitle}
              </h1>
              <p className="text-sm text-gray-300 mb-6">
                {data.titles[0].plot}
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-semibold hover:bg-gray-200">
                  ▶ Play
                </button>
                <button
                  onClick={() => {
                    let movieId = data.titles[0].id;
                    let url = "/preview/" + encodeURIComponent(movieId);
                    navigate(url);
                  }}
                  className="bg-gray-500/70 px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-500"
                >
                  ⓘ More Info
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Movie Row */}
      <section className="px-10 mt-10">
        <h2 className="text-lg font-semibold mb-4">Top Picks</h2>
        <div className="flex gap-4 overflow-x-scroll h-[350px] overflow-y-hidden items-center justify-start">
          {isSuccess &&
            data.titles.map((movie, index) => {
              if (index > 9) return; // Show only first 10 movies
              return (
                <div
                  key={movie.id}
                  className="min-w-[250px] h-full grid items-center justify-center grid-rows-[240px_1fr] gap-2 group rounded-md cursor-pointer"
                  onClick={() => {
                    let movieId = movie.id;
                    let url = "/preview/" + encodeURIComponent(movieId);
                    navigate(url);
                  }}
                >
                  <div className="relative h-full w-full rounded-md">
                    <div className="h-full  w-full rounded-md">
                      <img
                        src={movie.primaryImage.url}
                        alt={movie.primaryTitle}
                        className="rounded-md h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>{" "}
                    <span className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded">
                      Recently Added
                    </span>
                    <div
                      className="absolute text-[150px] inset-y-0 font-bold w-fit
 top-18 -left-5 z-10 text-neutral-200 text-stroke-white text-stroke-2 pointer-events-none select-none"
                    >
                      {index + 1}
                    </div>
                  </div>
                  <p className=" text-sm text-gray-300 w-full text-center font-semibold">
                    {movie.primaryTitle}
                  </p>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
