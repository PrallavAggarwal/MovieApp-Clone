export async function useGetAllData() {
  let data;
  try {
    const url = "https://api.imdbapi.dev/titles";
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Error fetching all data:", error);
  }

  return data;
}
