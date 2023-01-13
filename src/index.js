import "./index.css";
import "antd/dist/antd.min.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context";
import { ThemeWrapper } from "./context/theme.context";

//Stripe
import { Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51M4iOyDWTWgnTbmkj5Hhor6FHtJArSGv2sflLNAiy3LdcN5rsDTbfZuReNtGHWNIKPEUqtYtPTFhDu9jugKNs9cR00CSVbDU54"
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthWrapper>
    <ThemeWrapper>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </ThemeWrapper>
    </AuthWrapper>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
