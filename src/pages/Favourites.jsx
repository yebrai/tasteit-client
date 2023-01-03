import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "antd";

//CustomHook
import { useFetching } from "../hooks/isFetching";

// Shopping Cart
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart";
import {
  deleteFavouriteService,
  getMyFavouritesService,
} from "../services/tasteit.services";

const { Meta } = Card;

function Favourites() {
  //CustomHook
  const {loadingSpinner, disableFetching, showIsFetching} = useFetching()

  const navigate = useNavigate();

  // Context
  const { toggleCart } = useContext(ThemeContext);
  const { isLoggedIn, cartProducts} = useContext(AuthContext);

  // To manage list of favourite products
  const [list, setList] = useState([]);

  // When page is rendered
  useEffect(() => {
    handleMyFavourites();
  }, []);

  const handleMyFavourites = async () => {
    try {
      const response = await getMyFavouritesService();
      setList(response.data.favourites);
      disableFetching();
    } catch (error) {
      navigate("/error");
    }
  };

  // Deletes a favourite product from the current online user
  const deleteFavourite = async (productId) => {
    try {
      await deleteFavouriteService(productId);
      const newArr = [];
      list.forEach((eachProduct) => {
        if (eachProduct._id !== productId) {
          newArr.push(eachProduct);
        }
      });
      setList(newArr);
      setTimeout(() => {
        handleMyFavourites();
      }, 300);
    } catch (error) {
      navigate("/error");
    }
  };

  // Guard clause
  if (showIsFetching()) {
    return loadingSpinner();
  }

  return (
    <div id="favourites-wrapper">
      <h2 id="favourites-wrapper-title">Mis favoritos</h2>
      <Row style={{ width: "100%", justifyContent: "center" }}>
        {list.map((eachProduct) => {
          return (
            <Col key={eachProduct._id}>
              <Card hoverable>
                <Link to={`/${eachProduct._id}/details`} className="card-link">
                  <Meta />
                  <img
                    className="card-images"
                    alt={eachProduct.name}
                    src={eachProduct.image}
                  />
                  <h2>{eachProduct.name}</h2>
                  <p>
                    <span>Precio:</span> {eachProduct.price}€
                  </p>
                  <p>
                    <span>Localidad:</span> {eachProduct.location}
                  </p>
                </Link>
                <div className="icon-heart-btn-container">
                  <Button
                    className="icons-like"
                    type="text"
                    icon={<FaHeart style={{ color: "red" }} size="20px" />}
                    onClick={() => deleteFavourite(eachProduct._id)}
                  ></Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      {isLoggedIn && (
        <button onClick={toggleCart} className="cart-button">
          <FaShoppingCart size="2em" />
          <div className="cart-button-quantity">
            <span>{cartProducts.length}</span>
          </div>
        </button>
      )}
      <ShoppingCart />
    </div>
  );
}

export default Favourites;
