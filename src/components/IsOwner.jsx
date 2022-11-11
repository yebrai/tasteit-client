import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { verifyService } from "../services/auth.services";

function IsOwner(props) {

  //const { authenticateUser } = useContext(AuthContext)
  const { check } = props;

  const [prueba, setPrueba] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  
  useEffect(() => {
    testing()
  }, [])

  const testing = async () => {
    try {
      const response = await verifyService()
      setPrueba(response.data)
      setIsFetching(false)
    
      return prueba

    } catch(error) {
      console.log(error)
    }
  }

  isFetching && <h3>loading...</h3>
  
  if (prueba.user._id === check) {
    return props.children;
  };

}

export default IsOwner