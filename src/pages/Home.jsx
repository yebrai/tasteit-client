import { useContext } from "react"
import { Link } from "react-router-dom"
import img from "../assets/all.jpg"
import img2 from "../assets/bebidas.jpg"
import img3 from "../assets/comidas.jpg"
import img4 from "../assets/postre.jpg"
import { AuthContext } from "../context/auth.context"

import ShoppingCart from "../components/ShoppingCart";

// React icon
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react"
import { Image } from "antd"

function Home() {
  const {showCart, setShowCart} = useContext(AuthContext)

  return (
    <div>
      <div className="homeBoxContainer">
        <Link to="/all/products" className="image-link-container">
        <img width={400} src={img}/> 
        <div className="home-image-text">
        <p >Todas las Comidas</p>
        </div></Link>
        <Link to="/drinks/products" ><Image src={img2} alt="" width={400} height={300} /></Link>
      </div>
      <div className="homeBoxContainer">
        <Link to="/foods/products"><img src={img3} alt="" width={400} height={300} /></Link>
        <Link to="/desserts/products"><img src={img4} alt="" width={400} height={300} /></Link>
      </div>
      <button onClick={()=>setShowCart(true)} className="cart-button">
        <FaShoppingCart />
        <span>12</span>
      </button>
        {showCart && <ShoppingCart />}
    </div>
  )
}

export default Home