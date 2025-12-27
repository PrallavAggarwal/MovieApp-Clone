import { useState } from "react";
import "./App.css";
import { Hero } from "./components/hero";
import { useGetAllData } from "./utils/apiCalls/getAllData";
import { Home } from "./components/home";
import { Routes, Route } from "react-router-dom";
import { TvShows } from "./pages/tvshows";
import { Movies } from "./pages/movies";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Popular } from "./pages/new&popular";
import { MoviePreview } from "./components/moviepreview";
import { MyList } from "./pages/mylist";
import { Profile } from "./pages/profile";

function App() {
  const [count, setCount] = useState(0);

  async function handleClick() {
    const result = await useGetAllData();
    console.log(result);
  }

  return (
    <div className="App h-screen w-screen overflow-x-hidden scrollbar-hidden">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup/:passedemail" element={<SignUp />} />
        <Route path="/signup/" element={<SignUp />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/preview/:movieId" element={<MoviePreview />} />
        <Route path="/watchlist" element={<MyList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
