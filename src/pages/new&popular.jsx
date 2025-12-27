import { useQuery } from "@tanstack/react-query";
import { filterMovies, topMovies } from "../utils/queryOptions/topmovies";
import { SearchBar } from "../components/searchBar";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "../components/loader";

export function Popular() {
  const nums = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  let filter = "TV_SERIES";
  const { data, isLoading, isSuccess, isError, isFetching } =
    useQuery(topMovies());
  console.log(data);
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen h-auto overflow-y-auto text-white px-3 py-3">
      <div className="w-screen flex items-center justify-start mx-4 mb-4 mt-1">
        <SearchBar />
      </div>
      {isSuccess && (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-flow-row grid-cols-2 gap-2">
          {data.titles.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                let movieId = movie.id;
                let url = "/preview/" + encodeURIComponent(movieId);
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
                    loading="lazy"
                  />
                </div>{" "}
              </div>
              <p className=" text-sm text-gray-300">{movie.primaryTitle}</p>
            </div>
          ))}
          {isError && <div>Error fetching data</div>}
        </div>
      )}
      {isLoading && (
        <div className="h-screen w-screen">
          <PageLoader />
        </div>
      )}
      {isFetching && (
        <div className="h-screen w-screen">
          <PageLoader />
        </div>
      )}
    </div>
  );
}
