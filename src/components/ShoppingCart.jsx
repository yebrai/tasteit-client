import { FaBackward } from "react-icons/fa";

//Context
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { getShoppingCartService } from "../services/shoppingCart.services";
import { ThemeContext } from "../context/theme.context";

function ShoppingCart() {
  const { cartProducts, setCartProducts } =
    useContext(AuthContext);

  const {renderCart, toggleCart} = useContext(ThemeContext)

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    findCart();
  }, []);

  const findCart = async () => {
    try {
      const shoppingCartCurrentProducts = await getShoppingCartService();
      setCartProducts(shoppingCartCurrentProducts.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return <h3>loading...</h3>;
  }
  

  // Products and quantities to render in the shopping cart
  let cartProductsToShow = [];
  cartProducts.forEach(eachProduct => {
    let productToModify = cartProductsToShow.find(product => product._id === eachProduct._id)

    if (productToModify) {

      productToModify.quantity += 1;
      productToModify.price += eachProduct.price;

    } else {
      cartProductsToShow.push({
        _id: eachProduct._id,
        image: eachProduct.image,
        name: eachProduct.name,
        quantity: 1,
        price: eachProduct.price
      })
    }
  })

  return (
    <div className="shopping-cart-wrapper">
      <div className="shopping-cart">
        <div style={renderCart()}>
          <button
            type="button"
            className="cart-back-heading"
            onClick={toggleCart}
          >
            <FaBackward />
            <span className="top-title">Tu cesta</span>
            <span className="quantity-items">{cartProductsToShow.length} productos</span>
          </button>
          <div style={{padding: 20}}>
            {cartProductsToShow.map((eachProduct) => {
              return (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", margin: "40px 0", fontSize: 20, border: "1px solid lightgray", padding: 5, borderRadius: 5}}>
                  <img src={eachProduct.image} alt={eachProduct.name} style={{width: 60, height: 50, borderRadius: 2}} />
                  <div style={{width: "100%", padding: 6, display: "flex", flexDirection: "column", margin: "0 0 0 10px"}}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <p style={{margin: 0}}>{eachProduct.name}</p>
                      <p style={{margin: 0, fontWeight: "bolder"}}>{eachProduct.price} €</p>
                    </div>
                    <p style={{margin: 0}}>Cantidad: {eachProduct.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
