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

// Stripe
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { sendStripePaymentService } from "./services/shoppingCart.services";

const stripePromise = loadStripe(
  "pk_test_51M4iOyDWTWgnTbmkj5Hhor6FHtJArSGv2sflLNAiy3LdcN5rsDTbfZuReNtGHWNIKPEUqtYtPTFhDu9jugKNs9cR00CSVbDU54"
);

// Returns Payment Form with Stripe
const CheckoutForm = () => {
  const stripe = useStripe(); // Stripe Hook which returns connection to stripe
  const elements = useElements(); // Stripe Hook which allows to access and manipulate stripe elements like <CardElement />

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement), // getElement gets CardElement input (the number)
    });

    // If there is not error when payment is created, send it to BE
    if (!error) {
      const { id } = paymentMethod;

      try {
        // Response from backend
        await sendStripePaymentService({
          id,
          amount: 100000,
        });

        elements.getElement(CardElement).clear();
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Comprar producto</button>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:productId/details"
          element={
            <IsPrivate>
              <Details />
            </IsPrivate>
          }
        />
        <Route path="/:type/products" element={<FoodList />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route
          path="/purchases"
          element={
            <IsPrivate>
              <Purchases />
            </IsPrivate>
          }
        />
        <Route
          path="/my-favourites"
          element={
            <IsPrivate>
              <Favourites />
            </IsPrivate>
          }
        />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
