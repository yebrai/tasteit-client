import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import img from "../assets/all.jpg"
import img2 from "../assets/bebidas.jpg"
import img3 from "../assets/comidas.jpg"
import img4 from "../assets/postre.jpg"




function Home() {

  const [ list, setList ] = useState([])
  const [ isFetching, setIsFetching ] = useState(true)
  const user = "user"
  
  const handleFood = async(type) => {
    try {
      const response = await axios.get(`http://localhost:5005/api/${type}`)
      console.log(response)
      setList(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <div >
    <div className="homeBoxContainer">
    <Link onClick={() => handleFood(user)} to="/all/products"><img src={img} alt="" width={400} height={300} /></Link>
    <Link onClick={() => handleFood(user)} to="/drinks/products"><img src={img2} alt="" width={400} height={300} /></Link>
    </div>
    <div className="homeBoxContainer">
    <Link onClick={() => handleFood(user)} to="/foods/products"><img src={img3} alt="" width={400} height={300} /></Link>
    <Link onClick={() => handleFood(user)} to="/desserts/products"><img src={img4} alt="" width={400} height={300} /></Link>
    </div>
    </div>
  )
}

export default Home