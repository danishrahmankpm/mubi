import { Routes, Route } from "react-router-dom";
import ExplorePage from "./components/ExplorePage";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      {/* <Route path="/movies" element={<Movies />} /> */}
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
export default App
