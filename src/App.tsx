import { Routes, Route } from "react-router-dom";
import ExplorePage from "./components/ExplorePage";
import ProtectedRoute from "./utils/ProtectedRoute";

import MoviePage from "./components/MoviePage";
import AuthCallback from "./components/AuthCallback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      {<Route path="/authcallback" element={<AuthCallback />} />}
      
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
}
export default App
