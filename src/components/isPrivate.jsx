import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {Navigate} from "react-router-dom"

function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    // Return the wrapped component between IsPrivate tags
    return props.children;
    
  } else {
    // Navigate instead of navigate, because IsPrivate component always must return a JSX component
    return <Navigate to="/"/>
  }
}

export default IsPrivate;


// ruta tipo get, pasamos id de propietario
// if product.owner.id === 


//bonus
//get pasamos el id del user y que busque segun owner
//mis productos 