import service from "./config.services";

// service = http://localhost:5005/api

//Send data at newUser to "api"
const signupService = (newUser) => {
  return service.post("/auth/signup", newUser)
}

//Send data at userCredentials to "api"
const loginService = (userCredentials) => {
  return service.post("/auth/login", userCredentials)
}

//get data at newUser to "api"
const verifyService = () => {
  return service.get("/auth/verify")
}


export {
  signupService,
  loginService,
  verifyService
}