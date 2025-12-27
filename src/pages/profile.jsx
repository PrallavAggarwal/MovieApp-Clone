import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg";
import { logout } from "../utils/authenticator/authServices";
import { useContext } from "react";
import { WatchlistContext } from "../context/watchListContext";

export function Profile() {
  const activeUser = JSON.parse(localStorage.getItem("active_user"));
  let searchKey = `watchlist_${activeUser ? activeUser.email : ""}`;
  const mylist = JSON.parse(localStorage.getItem(searchKey));

  console.log("activeUser : ", activeUser);
  console.log("mylist : ", mylist);

  const { logout } = useContext(WatchlistContext);

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-black px-4 py-2 md:py-10 flex flex-col items-start justify-start">
      {activeUser && (
        <div>
          <div className="w-full flex gap-2  items-center justify-start">
            <div className="w-[200px] aspect-square overflow-hidden  ">
              <img src={avatar} className="h-full w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold text-white">
                Welcome To your space
              </div>
              <div className="">
                <span className="text-neutral-400 text-2xl">Email : </span>
                <span className="text-neutral-100 font-bold text-2xl ">
                  {activeUser.email}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-1.5 rounded text-xl font-bold w-fit h-fit"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 gap-2 w-full">
            <div className="text-3xl text-white font-semibold">WatchList</div>
            <div>
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
                        <p className=" text-sm text-gray-300">
                          {movie.primaryTitle}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!activeUser && (
        <div className="bg-black w-screen h-screen flex items-center justify-center text-gray-300 text-3xl font-bold">
          User not found
        </div>
      )}
    </div>
  );
}
