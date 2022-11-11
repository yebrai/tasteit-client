import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductEditModal from "../components/ProductEditModal";
import { getProductDetailsService } from "../services/tasteit.services";

function Details() {

  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState("");
  const [isFetching, setIsFetching] = useState(true)
  
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await getProductDetailsService(productId);
      console.log(response);
      setProductDetails(response.data);
      setIsFetching(false)

    } catch (error) {
      console.log(error);
    }
  };

  // Guard clause
  isFetching && <h3>Loading...</h3>

  return (
    <div>
      <p style={{textAlign: "center", margin: "30px 0", fontWeight: "bold", color: "darkgray"}}>{productDetails.category === "foods" ? "Comidas" : productDetails.category === "desserts" ? "Postres" : productDetails.category === "drinks" ? "Bebidas" : null}</p>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", margin: "50px 80px", width: "100%"}}>
        <img src={productDetails.image} alt={productDetails.name} style={{width: 360, height: 360, borderRadius: "20px"}}/>
        <div style={{display: "flex", flexDirection: "column", alignItems: "start", margin: "0 0 0 60px"}}>
          <h2 style={{fontSize: 50, color: "#324d67"}}>{productDetails.name}</h2>
          <p><span style={{fontWeight: "bolder", fontSize: 22}}>Detalles:</span></p>
          <p>{productDetails.description}</p>
          <p style={{fontWeight: "bolder", fontSize: 40, color: "red"}}>{productDetails.price}€</p>
          <p><span style={{fontWeight: "bolder"}}>Vendido en:</span> {productDetails.location}</p>
          <p></p>
        </div>
      </div>

      <ProductEditModal />
    </div>
  );
}

export default Details;
