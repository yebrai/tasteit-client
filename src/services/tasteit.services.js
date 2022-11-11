import service from "./config.services";

const getUserService = () => {
  return service.get(`/user/details`)
}

const addProductService = (newProduct) => {
    return service.post("/product/add", newProduct)
  }

const editUserService = (userId, userUpdates) => {
  return service.patch(`/user/${userId}/details`, userUpdates)
}

  export {
    addProductService,
    getUserService,
    editUserService
  }