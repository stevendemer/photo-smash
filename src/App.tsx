import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import RootLayout from "./components/ui/RootLayout";

import Homepage from "src/pages/Homepage";
import SearchPage from "src/pages/SearchPage";
import TopicsPage from "src/pages/TopicsPage";
import SingleImage from "src/pages/SinglePage";
import ModalLayout from "./components/ui/ModalLayout";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route element={<ModalLayout />}>
              <Route path="/:id" element={<SingleImage />} />
            </Route>
            <Route path="/photos/:query" element={<SearchPage />} />
            <Route path="/photos/topic/:query" element={<TopicsPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
