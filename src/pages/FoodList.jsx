import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "antd";
import SearchFood from "../components/SearchFood";

import { useFetching } from "../hooks/isFetching";

import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart";
import { ThemeContext } from "../context/theme.context.js";
import { AuthContext } from "../context/auth.context";
import {
  addFavouritesService,
  deleteFavouriteService,
  getFavouritesService,
  getProductTypeService,
} from "../services/tasteit.services";

// React icon


const { Meta } = Card;

function FoodList() {
  //CustomHook
  const {loadingSpinner, disableFetching, showIsFetching} = useFetching()

  const navigate = useNavigate();

  const { toggleCart } = useContext(ThemeContext);
  const { isLoggedIn, cartProducts } = useContext(AuthContext);

  // Food category received from Home.jsx link
  const { type } = useParams();

  // To manage list of selected products from Home.jsx: all, foods, desserts or drinks
  const [list, setList] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [foodToShow, setFoodToShow] = useState([]);

  // Function to manage search in SearchFood.jsx
  const filterFood = (filterQuery) => {
    const filteredFood = list.filter((eachFood) =>
      eachFood.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
    // Updates current displayed list
    setFoodToShow(filteredFood);
  };

  // Render a list of products depending on the passed type params
  useEffect(() => {
    handleFood(type);
  }, []);

  const handleFood = async (type) => {
    try {
      const response = await getProductTypeService(type);
        setList(response.data);
        setFoodToShow(response.data);
        disableFetching();
      if (isLoggedIn) {
        const userFavourites = await getFavouritesService();
        setFavourites(userFavourites.data.favourites);
      }

    } catch (error) {
      navigate("/error");
    }
  };

  // Adds a new favourite product to the current online user
  const addFavouriteToUser = async (product) => {
    try {
      const addedProduct = await addFavouritesService(product);
      setFavourites([...favourites, addedProduct.data]);
        handleFood(type);
    } catch (error) {
      navigate("/error");
    }
  };

  // Deletes a favourite product from the current online user
  const deleteFavourite = async (productId) => {
    try {
      await deleteFavouriteService(productId);
      const newArr = [];
      favourites.forEach((eachProduct) => {
        if (eachProduct._id !== productId) {
          newArr.push(eachProduct);
        }
      });
      setFavourites(newArr);
        handleFood(type);
    } catch (error) {
      navigate("/error");
    }
  };

  if (showIsFetching()) {
    return loadingSpinner();
  }

  return (
    <div className="cards-list-main">
      {isLoggedIn ? <SearchFood type={type} filterFood={filterFood} /> : null}
      <div className="cards-list-container">
        <Row justify={"center"}>
          {foodToShow.map((eachProduct) => {
            return (
              <Col key={eachProduct._id}>
                <Card hoverable>
                  <Link
                    to={
                      isLoggedIn
                        ? `/${eachProduct._id}/details`
                        : `/${type}/products`
                    }
                    className="card-link"
                  >
                    <Meta />
                    <img
                      alt={eachProduct.name}
                      src={eachProduct.image}
                      className="card-images"
                    />
                    <h2><b>{eachProduct.name}</b></h2>
                    <hr />
                    <p>
                      <span><b> Precio: </b></span> {eachProduct.price}€
                    </p>
                    <p>
                      <span><b> Localidad: </b></span>
                      {eachProduct.location}
                    </p>
                  </Link>

                  {isLoggedIn ? (
                    <div className="list-fav-icons">
                      {favourites.includes(eachProduct._id) ? (
                        <Button
                          className="icons-like"
                          type="text"
                          icon={
                            <FaHeart style={{ color: "red" }} size="20px" />
                          }
                          onClick={() => deleteFavourite(eachProduct._id)}
                        ></Button>
                      ) : (
                        <Button
                          className="icons-like"
                          type="text"
                          icon={
                            <FaRegHeart style={{ color: "red" }} size="20px" />
                          }
                          onClick={() => addFavouriteToUser(eachProduct)}
                        ></Button>
                      )}
                    </div>
                  ) : null}
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
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

export default FoodList;
