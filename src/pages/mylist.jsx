import { useQuery } from "@tanstack/react-query";
import { filterMovies } from "../utils/queryOptions/topmovies";
import { useContext } from "react";
import { WatchlistContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

export function MyList() {
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  let searchKey = `watchlist_${activeUser.email}`;
  const mylist = JSON.parse(localStorage.getItem(searchKey));

  console.log("activeUser : ", activeUser);
  console.log("mylist : ", mylist);

  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen h-auto overflow-y-auto text-white px-10 py-10">
      {activeUser && (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-flow-row grid-cols-2 gap-2">
          {mylist &&
            mylist.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  let movieId = movie.id;
                  let url = "/preview/" + encodeURIComponent(movieId);
                  console.log("mylist clicked : ", movieId, url);
                  navigate(url);
                }}
                className="min-w-[200px] h-full grid grid-rows-[300px_1fr]  gap-2 group rounded-md cursor-pointer"
              >
                <div className="relative h-full rounded-md">
                  <div className="h-full rounded-md">
                    <img
                      src={movie.primaryImage.url}
                      alt={movie.primaryTitle}
                      className="rounded-md h-full w-[90%] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>{" "}
                </div>
                <p className=" text-sm text-gray-300">{movie.primaryTitle}</p>
              </div>
            ))}
          {!mylist && (
            <div className="h-full w-full bg-black text-gray-300 font-bold text-3xl flex items-center justify-center">
              Add items to see here
            </div>
          )}
        </div>
      )}
      {!activeUser && (
        <div
          className="absolute h-screen w-screen bg-black flex items-center justify-center font-bold text-3xl text-gray-300"
          onClick={() => navigate("/hero")}
        >
          User Not Found
        </div>
      )}
    </div>
  );
}
