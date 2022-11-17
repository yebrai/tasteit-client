import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.services"
import { getShoppingCartService } from "../services/shoppingCart.services"


import gifFood from "../assets/spinners/food-spinner.gif"

const AuthContext = createContext()

function AuthWrapper(props) {

  // Global states and functions
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  // Shopping cart items
  const [cartProducts, setCartProducts] = useState([])

  //componentDidMount for all app
  useEffect(() => {
    authenticateUser()
  }, []) 

  const authenticateUser = async () => {
    setIsFetching(true)
    try {
      // 1 Verify token
      const response = await verifyService()
      setIsLoggedIn(true)
      // 2 Update user data
      setUser(response.data.user)
      setIsFetching(false)

    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      setUser(null)
      setIsFetching(false)
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
  
  const loadingSpinner = () => {
    return (
      <div className="spinner-container">
    <h2 className="spinner-title blinking">Taste It...</h2>
    <img className="spinner" src={gifFood} alt="" />
    </div>
    );
  }

  if (isFetching === true) {
    return loadingSpinner()
  }

  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
    setIsLoggedIn,
    setUser,
    cartProducts,
    setCartProducts,
    findCart,
    loadingSpinner
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