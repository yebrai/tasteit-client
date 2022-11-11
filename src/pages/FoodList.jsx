import React from 'react'
import { useParams } from 'react-router-dom'

function FoodList(props) {
  const {type} = useParams()
  console.log(type)
  console.log(props)
  return (
    <div>FoodList</div>
  )
}

export default FoodList