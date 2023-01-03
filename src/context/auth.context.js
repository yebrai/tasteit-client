import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.services"
import { getShoppingCartService } from "../services/shoppingCart.services"
const AuthContext = createContext()

function AuthWrapper(props) {

  // Global states and functions
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)

  // Shopping cart items
  const [cartProducts, setCartProducts] = useState([])

  // ComponentDidMount for all app
  useEffect(() => {
    authenticateUser()
  }, []) 

  const authenticateUser = async () => {
    try {
      const response = await verifyService()
      setIsLoggedIn(true)
      setUser(response.data.user)
    } catch (error) {
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  // To update shopping cart items from any component
  const findCart = async () => {
    try {
      const shoppingCartCurrentProducts = await getShoppingCartService();
      setCartProducts(shoppingCartCurrentProducts.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
    setIsLoggedIn,
    setUser,
    cartProducts,
    setCartProducts,
    findCart
  }

  
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper,
}