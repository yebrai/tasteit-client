import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import FoodList from "./pages/FoodList";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import AddFood from "./pages/AddFood";
import Home from "./pages/Home";
import IsPrivate from "./components/IsPrivate.jsx";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:productId/details" element={<Details />} />
        {/* Modal de edit product en details */}
        <Route path="/:type/products" element={<FoodList />} />
        <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
        <Route path="/add" element={<IsPrivate><AddFood /></IsPrivate>} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
