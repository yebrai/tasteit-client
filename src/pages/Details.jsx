import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductEditModal from "../components/ProductEditModal";
import { getProductDetailsService } from "../services/tasteit.services";
import { Button } from "antd";
import IsOwner from "../components/IsOwner";
import ProductDeletionModal from "../components/ProductDeletionModal";

function Details() {
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await getProductDetailsService(productId);
      setProductDetails(response.data);
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
          <p style={{ fontWeight: "bolder", fontSize: 40, color: "#229e6b" }}>
            {productDetails.price}€
          </p>
          <p>
            <span style={{ fontWeight: "bolder" }}>Vendido en:</span>{" "}
            {productDetails.location}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Comercializado por:</span>{" "}
            {productDetails.owner.name}
          </p>
        </div>
        <div>

        </div>
      </div>

    </div>
  );
}

export default Details;
