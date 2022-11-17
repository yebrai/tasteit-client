import React, { useContext, useEffect, useState } from 'react'
import { getUserService } from '../services/tasteit.services'
import EditProfileModal from '../components/EditProfileModal';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function Profile() {

  const {loadingSpinner} = useContext(AuthContext)

  const [user, setUser] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  useEffect(()=> {
    getUser()
  },[])

  const getUser = async() => {
    try {
      const response = await getUserService()
      setUser(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (isFetching) {
    return loadingSpinner()
  }

  return (
    <div style={{textAlign:"center", paddingTop: "100px"}}>
      <img src={user.profileImage} alt="" />
      <h3>Name: {user.name}</h3>
      <h5>Email: {user.email}</h5>
      <p>Edad: {user.age}</p>
      <p>Tipo: {user.role}</p>
      <EditProfileModal />
      <Link className='link-profile' to="/purchases">Historial de compras</Link>
      <Link className='link-profile' to="/my-favourites">Mis favoritos</Link>
    </div>
  )
}

export default Profile