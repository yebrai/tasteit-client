import React, { Suspense, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductEditModal from "../components/ProductEditModal";
import {
  addRatingService,
  getProductDetailsService,
  getProductsService,
} from "../services/tasteit.services";
import IsOwner from "../components/IsOwner";
import ProductDeletionModal from "../components/ProductDeletionModal";
import Counter from "../components/Counter";

// React icon
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart";
import { IoArrowBackCircleSharp } from "react-icons/io5";

//Context
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context.js";
//Toast
import toast from "react-hot-toast";
//Antd
import { Divider, Rate } from "antd";
import { useFetching } from "../hooks/isFetching";

function Details() {
  //Suspense / lazy for codeSplitting (Cascade rendering components)
  const Article = React.lazy(()=> import('../components/AddComment'))
  //CustomHook
  const {loadingSpinner, disableFetching, showIsFetching} = useFetching()


  const navigation = useNavigate();
  const navigate = useNavigate();

  // Selected product
  const { productId } = useParams();

  // Shopping cart item
  const { isLoggedIn, cartProducts} = useContext(AuthContext);
  const { toggleCart } = useContext(ThemeContext);

  const [productDetails, setProductDetails] = useState("");
  const [allProducts, setAllProducts] = useState("");
  const [currentRate, setCurrentRate] = useState(0);


  // To re-render details page if a new product is selected in the carousel or a rating is done
  useEffect(() => {
    getDetails();
  }, [productId, currentRate]);

  // Initialize default current rate to show when page renders to 0
  let averageRate = 0;
  let averageRateToShow = 0;

  const getDetails = async () => {
    try {
      const response = await getProductDetailsService(productId);
      setProductDetails(response.data);

      // Rating configuration
      response.data.ratings.forEach((eachRating) => {
        averageRate += eachRating;
      });
      // Average to show when page reloads
      averageRateToShow = averageRate / response.data.ratings.length;

      const allResponse = await getProductsService();

      setCurrentRate(averageRateToShow);
      setAllProducts(allResponse.data);

      disableFetching();
    } catch (error) {
      navigate("/error");
    }
  };

  // Guard clause

  // Function to execute when a new user gives a rate to the product
  const handleRate = async (value) => {
    let averageRate = 0;
    productDetails.ratings.forEach((eachRating) => {
      averageRate += eachRating;
    });
    let newAverage =
      (averageRate + value) / (productDetails.ratings.length + 1);

    try {
      const response = await addRatingService(
        productDetails._id,
        Number(value)
      );

      if (response.data === "Valoración previamente añadida") {
        toast(`Tan solo es posible añadir una valoración`, { icon: "ℹ️" });
      } else if (response.data === "Valoración añadida") {
        toast(`Valoración añadida`, { icon: "✔️" });
      }

      setCurrentRate(newAverage);
    } catch (error) {
      navigate("/error");
    }
  };

  if (showIsFetching()) {
    return loadingSpinner();
  }

  return (
    <div className="main-details-container">
      <Link onClick={() => navigation(-1)} className="back-details-icon" to="/">
        <IoArrowBackCircleSharp />
      </Link>

      <Divider className="details-divider">
        {productDetails.category === "foods"
          ? "Comidas"
          : productDetails.category === "desserts"
          ? "Postres"
          : productDetails.category === "drinks"
          ? "Bebidas"
          : null}
      </Divider>

      {/* Checks if product owner is the same as current online user */}
      <IsOwner owner={productDetails.owner._id}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ProductEditModal product={productDetails} />
          <ProductDeletionModal product={productDetails} />
        </div>
      </IsOwner>

      <div className="product-details-container">
        <img src={productDetails.image} alt={productDetails.name} />
        <div className="product-details-wrapper">
          <h3>{productDetails.name}</h3>

          {/* Rating buttons */}
          <div className="rate-star-container">
            <Rate
              allowHalf
              className="ant-rate-text"
              style={{ fontSize: "25px", margin: 0 }}
              value={currentRate}
              onChange={(value) => handleRate(value)}
              allowClear
            />
            <p>({productDetails.ratings.length} valoraciones)</p>
          </div>

          <p className="details-secondary">
            <span className="details-sub-span">Localidad: </span>
            {productDetails.location}
          </p>
          <p className="details-secondary">
            <span className="details-sub-span">Comercializado por: </span>
            {productDetails.owner.name}
          </p>
          <p className="details-span">Detalles:</p>
          <p className="details-description">{productDetails.description}</p>

          <div className="counter-price-wrapper">
            <p className="details-price">{productDetails.price}€</p>
            <Counter product={productDetails} />
          </div>
        </div>
      </div>

      {isLoggedIn && (
        <button onClick={toggleCart} className="cart-button">
          <FaShoppingCart size="2em" />
          <div className="cart-button-quantity">
            <span>{cartProducts.length}</span>
          </div>
        </button>
      )}

      {/* Marquee to show other products  */}
      <div className="products-container">
        <h2>Quizá también te guste:</h2>
        <div className="scroll-area">
          <div className="wrapper">
            {allProducts.map((eachProduct) => {
              return (
                <div key={eachProduct._id}>
                  <Link to={`/${eachProduct._id}/details`}>
                    <img
                      className="carousel-images"
                      src={eachProduct.image}
                      alt={eachProduct.name}
                    />
                  </Link>
                  <p id="carousel-name" className="carousel-items">
                    {eachProduct.name}
                  </p>
                  <p id="carousel-price" className="carousel-items">
                    {eachProduct.price}€
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Suspense fallback={loadingSpinner()}>
      <Article product={productDetails} style={{ margin: 0 }} />
      </Suspense>

      <ShoppingCart />
    </div>
  );
}

export default Details;
