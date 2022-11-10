import axios from "axios"

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
})

//
service.interceptors.request.use((config) => {
  
  // 1. Search for the token in localStorage
  const authToken = localStorage.getItem("authToken")

  const tokenFull = `Bearer ${authToken}`

  // 2. adds the authorization
  if (authToken) {
    config.headers.authorization = tokenFull
  }

  return config
})


export default service