import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
import SearchFood from "../components/SearchFood";

// React icon
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart";
import { ThemeContext } from "../context/theme.context.js";
import { AuthContext } from "../context/auth.context";
import { getProductTypeService } from "../services/tasteit.services";


const { Meta } = Card;

function FoodList() {

  const {toggleCart} = useContext(ThemeContext)
  const {isLoggedIn, cartProducts} = useContext(AuthContext)

  // Food category received from Home.jsx link
  const { type } = useParams();

  // To manage list of selected products from Home.jsx: all, foods, desserts or drinks
  const [list, setList] = useState([]);
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
      setList(response.data);
      setFoodToShow(response.data)
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h3>loading...</h3>;
  }

  return (
    <div>
      <SearchFood type={type} filterFood={filterFood} />
      
      <Row style={{ width: "100%", justifyContent: "center" }}>
        {foodToShow.map((eachProduct) => {
          return (
            <Col key={eachProduct._id}>
              <Link to={`/${eachProduct._id}/details`}>
                <Card
                  hoverable
                  style={{ width: 200, height: 290, margin: 20 }}
                  bodyStyle={{
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  cover={
                    <img
                      alt="example"
                      src={eachProduct.image}
                      style={{ width: "100%", height: 170, margin: 0}}
                    />
                  }
                >
                  <Meta
                    title={eachProduct.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "0 auto 10px",
                    }}
                  />
                  <p style={{margin: 0}}><span style={{fontWeight: "bolder"}}>Precio:</span> {eachProduct.price}€</p>
                  <p style={{margin: "0 auto 2px"}}><span style={{fontWeight: "bolder"}}>Localidad:</span> {eachProduct.location}</p>
                  <div>
                    
                  </div>
                </Card>
              </Link>
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
