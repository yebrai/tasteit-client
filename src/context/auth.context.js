import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.services"

const AuthContext = createContext()

function AuthWrapper(props) {

  // Global states and functions
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

//componentDidMount for all app
  useEffect(() => {
    authenticateUser()
  }, []) 

  const authenticateUser = async () => {
    setIsFetching(true)
    try {
      //1 Verify token
      const response = await verifyService()
      setIsLoggedIn(true)
      //2 Update user data
      setUser(response.data.user)
      setIsFetching(false)

    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      setUser(null)
      setIsFetching(false)
    }
  }

  // Shopping cart items
  const [showCart, setShowCart] = useState(false);

  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
    setIsLoggedIn,
    setUser,
    setShowCart,
    showCart
  }

  if (isFetching === true) {
    return (
      <div className="App">
        <h3>Cargando...</h3>
      </div>
    )
  }
  
// Consultar
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

//Exporta funciones en general pero tambien pasa el passedContext por props?
export {
  AuthContext,
  AuthWrapper
}