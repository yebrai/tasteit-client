import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "antd";
import SearchFood from "../components/SearchFood";

// React icon
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart";
import { ThemeContext } from "../context/theme.context.js";
import { AuthContext } from "../context/auth.context";
import { addFavouritesService, deleteFavouriteService, getFavouritesService, getProductTypeService } from "../services/tasteit.services";

const { Meta } = Card;

function FoodList() {
  
  const {toggleCart} = useContext(ThemeContext)
  const {isLoggedIn, cartProducts} = useContext(AuthContext)

  // Food category received from Home.jsx link
  const { type } = useParams();

  // To manage list of selected products from Home.jsx: all, foods, desserts or drinks
  const [list, setList] = useState([]);
  const [favourites, setFavourites] = useState([])
  const [foodToShow, setFoodToShow] = useState([])
  const [isFetching, setIsFetching] = useState(true);

  // Function to manage search in SearchFood.jsx
  const filterFood = (filterQuery) => {
    const filteredFood = list.filter((eachFood) => eachFood.name.includes(filterQuery));
    // Updates current displayed list
    setFoodToShow(filteredFood);
  };
  
  useEffect(() => {
    handleFood(type);
  }, []);

  const handleFood = async (type) => {
  try {
      const response = await getProductTypeService(type)
      const userFavourites = await getFavouritesService();
      console.log(userFavourites)
      setList(response.data);
      setFoodToShow(response.data)
      setFavourites(userFavourites.data.favourites)
      setIsFetching(false);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  // Guard clause
  if (isFetching === true) {
    return <h3>loading...</h3>;
  }

  // Adds a new favourite product to the current online user
  const addFavouriteToUser = async (product) => {
    try {
      const addedProduct = await addFavouritesService(product)
      setFavourites([...favourites, addedProduct.data])
      setTimeout( () => {
        handleFood(type)
      }, 300)
      
    } catch(error) {
      console.log(error);
    }
  }

  // Deletes a favourite product from the current online user
  const deleteFavourite = async (productId) => {
    try {
      await deleteFavouriteService(productId)
      const newArr = [];
      favourites.forEach(eachProduct => {
        if (eachProduct._id !== productId) {
          newArr.push(eachProduct)
        }
      })
      setFavourites(newArr)
      setTimeout( () => {
        handleFood(type)
      }, 300)

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div >
      <SearchFood type={type} filterFood={filterFood} />
      <Row style={{ width: "100%", justifyContent: "center"}}>
        {foodToShow.map((eachProduct) => {
          return (
            <Col key={eachProduct._id}>
                <Card hoverable>
                <Link to={`/${eachProduct._id}/details`} className="card-link">
                  <Meta />
                  <img
                    alt="example"
                    src={eachProduct.image}
                    style={{ width: "100%", height: "155px", margin: 0}}
                  />
                  <h2>{eachProduct.name}</h2>
                  <p style={{margin: 0}}><span style={{fontWeight: "bolder"}}>Precio:</span> {eachProduct.price}€</p>
                  <p style={{margin: "0 auto 2px"}}><span style={{fontWeight: "bolder"}}>Localidad:</span> {eachProduct.location}</p>
                </Link>
                  
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: "80%"}}>
                    {favourites.includes(eachProduct._id)
                    ? <Button type="text" icon={<FaHeart style={{color: "red"}}/>} onClick={() => deleteFavourite(eachProduct._id)}></Button>
                    : <Button type="text" icon={<FaRegHeart style={{color: "red"}}/>} onClick={() => addFavouriteToUser(eachProduct)}></Button>}
                  </div>
                  
                </Card>
            </Col>
          );
        })}
      </Row>
      {isLoggedIn && 
      <button onClick={toggleCart} className="cart-button">
        <FaShoppingCart size="2em"/>
        <div className="cart-button-quantity">
        <span>{cartProducts.length}</span>
        </div>
      </button>}
        <ShoppingCart />
    </div>
  );
}

export default FoodList;
