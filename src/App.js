import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import FoodList from "./pages/FoodList";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import Home from "./pages/Home";
import IsPrivate from "./components/IsPrivate.jsx";
import Purchases from "./pages/Purchases";
import Favourites from "./pages/Favourites";
import Intro from "./pages/intro/Intro";
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Intro />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/:productId/details" element={ <IsPrivate> <Details /> </IsPrivate>}/>
        <Route path="/:type/products" element={<FoodList />} />
        <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>}/>
        <Route path="/purchases" element={<IsPrivate><Purchases /></IsPrivate>}/>
        <Route path="/my-favourites" element={<IsPrivate><Favourites /></IsPrivate>}/>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </HelmetProvider>
  );
}

export default App;
