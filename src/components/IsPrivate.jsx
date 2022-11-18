import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

// Checks if no-logged user has access to the wrapped component
function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    // Return the wrapped component between IsPrivate tags
    return props.children;
  } else {
    // Navigate instead of navigate, because IsPrivate component always must return a JSX component
    return <Navigate to="/home" />;
  }
}

export default IsPrivate;
