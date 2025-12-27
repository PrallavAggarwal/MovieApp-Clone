import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { WatchlistProvider } from "./context/watchListContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <WatchlistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WatchlistProvider>
  </QueryClientProvider>,
);
