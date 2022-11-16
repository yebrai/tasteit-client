import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductEditModal from "../components/ProductEditModal";
import { getProductDetailsService, getProductsService } from "../services/tasteit.services";
import IsOwner from "../components/IsOwner";
import ProductDeletionModal from "../components/ProductDeletionModal";
import AddComment from "../components/AddComment";
import Counter from "../components/Counter";

// React icon
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart";

import { AuthContext } from "../context/auth.context";
import { ThemeContext} from "../context/theme.context.js"
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Details() {

  const { actualRoute } = useLocation()

  // Selected product
  const { productId } = useParams();

  // Shopping cart item
  const {isLoggedIn, cartProducts} = useContext(AuthContext)
  const {toggleCart} = useContext(ThemeContext)

  const [productDetails, setProductDetails] = useState("");
  const [allProducts, setAllProducts] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getDetails();
  }, [productId]);

  const getDetails = async () => {
    try {
      const response = await getProductDetailsService(productId);
      setProductDetails(response.data);
      const allResponse = await getProductsService();
      setAllProducts(allResponse.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Guard clause
  if (isFetching) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
    <Link className="back-details-icon" to="/" state={{ previousPath: actualRoute }}>
      <IoArrowBackCircleSharp />
    </Link>
      <p
        style={{
          textAlign: "center",
          margin: "30px 0",
          fontWeight: "bold",
          color: "darkgray",
        }}
      >
        {productDetails.category === "foods"
          ? "Comidas"
          : productDetails.category === "desserts"
          ? "Postres"
          : productDetails.category === "drinks"
          ? "Bebidas"
          : null}
      </p>

      {/* Checks if product owner is the same as current online user */}
      <IsOwner owner={productDetails.owner._id}>
        <div style={{display: "flex", flexDirection: "row"}}>
          <ProductEditModal product={productDetails}/>
          <ProductDeletionModal product={productDetails}/>
        </div>
      </IsOwner>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "50px 80px",
          width: "100%",
        }}
      >
        <img
          src={productDetails.image}
          alt={productDetails.name}
          style={{
            width: 360,
            height: 360,
            borderRadius: "20px",
            boxShadow: "0 0 5px 5px #229e6b",
            margin: "0 5% 0 0"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            margin: "0 0 0 5%"
          }}
        >
          <h2 style={{ fontSize: 50, color: "#324d67" }}>
            {productDetails.name}
          </h2>
          <p>
            <span style={{ fontWeight: "bolder", fontSize: 22 }}>
              Detalles:
            </span>
          </p>
          <p>{productDetails.description}</p>
          <p style={{ fontWeight: "bolder", fontSize: 40, color: "#229e6b", margin: 0}}>
            {productDetails.price}€
          </p>
          <p>
            <span style={{ fontWeight: "bolder" }}>Vendido en:</span>
            {productDetails.location}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Comercializado por:</span>
            {productDetails.owner.name}
          </p>
          
          <Counter product={productDetails}/>

        </div>
        
      </div>

      {isLoggedIn && 
      <button onClick={toggleCart} className="cart-button">
        <FaShoppingCart size="2em"/>
        <div className="cart-button-quantity">
        <span>{cartProducts.length}</span>
        </div>
      </button>}
      
      {/* Marquee to show other products  */}
      <div className="products-container">
        <h2>Quizá también te guste:</h2>
          <div className="scroll-area">
            <div className="wrapper">
              {allProducts.map(eachProduct => {
                return (
                  <div key={eachProduct._id}>
                    <Link to={`/${eachProduct._id}/details`} >
                      <img className="carousel-images" src={eachProduct.image} alt={eachProduct.name}/>
                    </Link>
                    <p id="carousel-name" className="carousel-items">{eachProduct.name}</p>
                    <p id="carousel-price" className="carousel-items">{eachProduct.price}€</p>
                  </div>
                )
              })}
            </div>
          </div>
      </div>
          
      <AddComment product={productDetails} style={{margin: 0}}/>
      <ShoppingCart />
    </div>
  );
}

export default Details;
