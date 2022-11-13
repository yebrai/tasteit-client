import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "antd";
import { AuthContext } from "../context/auth.context";
import IsOwner from "../components/IsOwner.jsx";
import SearchFood from "../components/SearchFood";
const { Meta } = Card;

function FoodList() {
 
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


  // To show / hide buttons according to the current user
  //const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    handleFood(type);
  }, []);

  const handleFood = async (type) => {
  try {
      const response = await axios.get(`http://localhost:5005/api/product/${type}`);
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
            <Col>
              <Link to={`/${eachProduct._id}/details`}>
                <Card
                  key={eachProduct._id}
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
                      style={{ width: "100%", height: 130, margin: 0}}
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
                  <div style={{ display: "flex", flexDirection: "row" }}>
                  </div>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default FoodList;
