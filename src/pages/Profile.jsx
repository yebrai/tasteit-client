import React, { useEffect, useState } from 'react'
import { getUserService } from '../services/tasteit.services'
import EditProfileModal from '../components/EditProfileModal';

function Profile() {

  const [user, setUser] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  useEffect(()=> {
    getUser()
  },[])

  const getUser = async() => {

    try {
      const response = await getUserService()
 
      setUser(response.data)
      setIsFetching(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (isFetching) {
    <p>...cargando</p>
  }
  return (
    <div style={{textAlign:"center"}}>
    <img src={user.profileImage} alt="" />
    <h3>Name: {user.name}</h3>
    <h5>Email: {user.email}</h5>
    <p>Edad: {user.age}</p>
    <p>Tipo: {user.role}</p>
    <EditProfileModal />
    </div>
  )
}

export default Profile