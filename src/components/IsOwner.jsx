import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function IsOwner(props) {

  const { owner } = props;
  const { user } = useContext(AuthContext)
  
  if (user._id === owner) {
    return props.children;
  };

}

export default IsOwner