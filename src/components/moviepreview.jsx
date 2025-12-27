import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Play, Plus, Cross, LogIn, Check } from "lucide-react";
import { moviesById } from "../utils/queryOptions/topmovies";
import { WatchlistContext } from "../context/watchListContext";
import { useContext } from "react";
import { useState } from "react";
import { PageLoader } from "./loader";

export function MoviePreview() {
  const { currentUser, toggleWatchlist, isInWatchlist } =
    useContext(WatchlistContext);
  console.log(currentUser);

  const { movieId } = useParams();
  const navigate = useNavigate();

  const { data, isError, isSuccess, isLoading } = useQuery(moviesById(movieId));
  console.log("data of datasById : ", data);

  const formatRuntime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      {isSuccess && (
        <div className="min-h-screen bg-[#000000] text-white font-sans">
          {/* Hero Movie Card Section */}
          <div className="relative max-w-6xl mx-auto px-4 pt-8">
            <div
              className="cursor-pointer absolute rotate-45 z-40 top-9 -right-10"
              onClick={() => navigate("/home")}
            >
              <Cross size={32} stroke="0" fill="var(--color-neutral-100)" />
            </div>
            <div className="relative w-full h-[650px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Background Image */}
              <img
                src={data.primaryImage.url}
                className="absolute inset-0 w-full h-full object-cover object-top"
                alt={data.primaryTitle}
                width={data.primaryImage.width}
                height={data.primaryImage.height}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex gap-2 mb-4">
                      {data.genres.map((genre, index) => (
                        <span
                          key={index}
                          className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-4">
                      {data.primaryTitle}
                    </h1>
                    <div className="flex items-center gap-4 mb-6 text-lg">
                      <span className="text-gray-300">{data.startYear}</span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                      <span className="text-gray-300">
                        {formatRuntime(data.runtimeSeconds)}
                      </span>
                      <div className="flex items-center gap-2 ml-4 bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                        <Star
                          className="text-[#f5c518] fill-[#f5c518]"
                          size={20}
                        />
                        <span className="font-bold">
                          {data.rating.aggregateRating}
                        </span>
                        <span className="text-gray-400 text-sm">/ 10</span>
                      </div>
                    </div>
                    <p className="text-gray-200 text-lg max-w-2xl leading-relaxed mb-4">
                      {data.plot}
                    </p>

                    <div className="text-lg max-w-2xl space-y-1 mb-8">
                      <div className="flex gap-2">
                        <span className="font-bold text-gray-100">
                          Directors
                        </span>
                        <div className="flex gap-2 flex-wrap">
                          {data.directors.map((d, i) => (
                            <span
                              key={d.id}
                              className="text-blue-400 hover:underline cursor-pointer"
                            >
                              {d.displayName}
                              {i < data.directors.length - 1 ? " • " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-gray-100">Stars</span>
                        <div className="flex gap-2 flex-wrap">
                          {data.stars.map((star, index) => (
                            <div className="text-blue-400 hover:underline cursor-pointer">
                              {star.displayName}
                            </div>
                          ))}
                          {/* {data.stars.map((star, index) => { */}
                          {/*   console.log("star : ", star); */}
                          {/*   return ( */}
                          {/*     <div */}
                          {/*       key={star.id} */}
                          {/*       className="text-blue-400 hover:underline cursor-pointer" */}
                          {/*     > */}
                          {/*       {star} */}
                          {/*       {i < data.stars.length - 1 ? " • " : ""} */}
                          {/*     </div> */}
                          {/*   ); */}
                          {/* })} */}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            // Optional: trigger login focus or message
                            return;
                          }
                          toggleWatchlist(data);
                        }}
                        disabled={!currentUser}
                        className={`${
                          !currentUser
                            ? "bg-gray-700 cursor-not-allowed text-gray-400"
                            : isInWatchlist(data.id)
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-[#f5c518] hover:bg-[#e2b616] text-black"
                        } px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform ${currentUser ? "hover:scale-105 active:scale-95" : ""} shadow-lg`}
                      >
                        {!currentUser ? (
                          <LogIn size={24} />
                        ) : isInWatchlist(data.id) ? (
                          <Check size={24} />
                        ) : (
                          <Plus size={24} />
                        )}
                        {!currentUser ? (
                          <span onClick={() => navigate("/")}>
                            "Login to Add"
                          </span>
                        ) : isInWatchlist(data.id) ? (
                          "In Watchlist"
                        ) : (
                          "Add to Watchlist"
                        )}
                      </button>
                      <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
                        <Play className="fill-white" size={20} /> Watch Trailer
                      </button>
                    </div>
                  </div>

                  {/* Poster Thumbnail (Floating) */}
                  <div className="hidden lg:block w-48 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 mb-2">
                    <img
                      src={data.primaryImage.url}
                      className="w-full h-full object-cover"
                      alt="Poster"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className=" h-screen w-screen">
          <PageLoader />
        </div>
      )}
    </div>
  );
}
