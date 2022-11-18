import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

// Checks if current user in payload is the owner of a product or comment
function IsOwner(props) {
  // Receives owner id by props when invocated
  const { owner } = props;
  const { user } = useContext(AuthContext);

  if (user._id === owner) {
    return props.children;
  }
}

export default IsOwner;
