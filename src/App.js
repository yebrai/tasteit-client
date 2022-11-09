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

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Modal de profile/signup product en navbar */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:productId/details" element={<Details />} />
        {/* Modal de edit product en details */}
        <Route path="/products" element={<FoodList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<AddFood />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
