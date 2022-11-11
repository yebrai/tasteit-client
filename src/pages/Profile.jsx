import React, { useEffect, useState } from 'react'
import { getUserService } from '../services/tasteit.services'

function Profile() {

  const [user, setUser] = useState("")

  useEffect(()=> {
    getUser()
  })

  const getUser = () => {

    try {
      const response = getUserService()
      console.log(response.data);
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{textAlign:"center"}}>
    <img src="" alt="" />
    <h3>Name: </h3>
    <h5>Email: </h5>
    <p>Age:</p>

    </div>
  )
}

export default Profile