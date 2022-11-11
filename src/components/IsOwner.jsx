import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { verifyService } from "../services/auth.services";

function IsOwner(props) {

  const { check } = props;
  const { user } = useContext(AuthContext)
  
  if (user._id === check) {
    return props.children;
  };

}

export default IsOwner