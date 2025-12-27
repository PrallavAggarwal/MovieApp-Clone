import { queryOptions } from "@tanstack/react-query";

export function topMovies() {
  const url =
    "https://api.imdbapi.dev/titles?startYear=2025&sortBy=SORT_BY_POPULARITY";

  return queryOptions({
    queryKey: ["topmovies"],
    queryFn: async () => {
      let data = await fetch(url).then((res) => res.json());
      return data;
    },
  });
}

export function filterMovies(filter) {
  const url = `https://api.imdbapi.dev/titles?types=${filter}&startYear=2025&sortBy=SORT_BY_POPULARITY`;

  return queryOptions({
    queryKey: ["filterMovies", filter],
    queryFn: async () => {
      let data = await fetch(url).then((res) => res.json());
      return data;
    },
  });
}

export function moviesById(id) {
  const url = "https://api.imdbapi.dev/titles/" + id;

  return queryOptions({
    queryKey: ["moviesById"],
    queryFn: async () => {
      try {
        let response = await fetch(url);
        let data = await response.json();
        if (data.code == 0) throw new Error("data not found.");
        return data;
      } catch (error) {
        throw error;
      }
    },
  });
}
