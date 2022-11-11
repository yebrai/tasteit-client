import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function FoodList() {

  // Food category received from Home.jsx link
  const {type} = useParams()

  // To manage list of selected products from Home.jsx: all, foods, desserts or drinks
  const [ list, setList ] = useState([])
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    handleFood(type)
  }, [])

  const handleFood = async(type) => {
    try {
      const response = await axios.get(`http://localhost:5005/api/product/${type}`)
      console.log(response)
      setList(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (isFetching === true) {
    return <h3>loading...</h3>
  }

  return (
    <div>
      {list.map(eachProduct => {
        return (
          <h3>{eachProduct.name}</h3>
        )
      })}
    </div>
  )
}

export default FoodList