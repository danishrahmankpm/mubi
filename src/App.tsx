import { Routes, Route } from "react-router-dom";
import ExplorePage from "./components/ExplorePage";
import Checkout from "./components/Checkout";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      {/* <Route path="/movies" element={<Movies />} /> */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App
