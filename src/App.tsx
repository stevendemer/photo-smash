import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Home = lazy(() => import("src/pages/Homepage"));
const Search = lazy(() => import("src/pages/SearchPage"));
const Topics = lazy(() => import("src/pages/TopicsPage"));

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos/:query" element={<Search />} />
          <Route path="/photos/topic/:query" element={<Topics />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
