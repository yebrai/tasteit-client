import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "antd";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
  addFavouritesService,
  deleteFavouriteService,
  getFavouritesService,
  getProductTypeService,
} from "../services/tasteit.services";
import { AuthContext } from "../context/auth.context";
import SearchFood from "./SearchFood";
import { useFetching } from "../hooks/useFetching";

const { Meta } = Card;

function LisOfFood({ type }) {

  const { loadingSpinner, showIsFetching, disableFetching  } = useFetching();
  // To manage list of selected products from Home.jsx: all, foods, desserts or drinks
  const [list, setList] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [foodToShow, setFoodToShow] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // Render a list of products depending on the passed type params
  useEffect(() => {
    handleFood(type);
  }, []);

  const handleFood = async (type) => {
    try {
        const response = await getProductTypeService(type);
        setList(response.data);
        setFoodToShow(response.data);
      if (isLoggedIn) {
        const userFavourites = await getFavouritesService();
        setFavourites(userFavourites.data.favourites);
      }
    } catch (error) {
      navigate("/error");
    }
  };
  // Function to manage search in SearchFood.jsx

  const filterFood = (filterQuery) => {
    const filteredFood = list.filter((eachFood) =>
      eachFood.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
    // Updates current displayed list
    setFoodToShow(filteredFood);
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

  if(showIsFetching()) {
    loadingSpinner()
  }

  return (
    <>
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
                    <h2>
                      <b>{eachProduct.name}</b>
                    </h2>
                    <hr />
                    <p>
                      <span>
                        <b> Precio: </b>
                      </span>{" "}
                      {eachProduct.price}€
                    </p>
                    <p>
                      <span>
                        <b> Localidad: </b>
                      </span>
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
    </>
  );
}

export default LisOfFood;
