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

const getProductDetailsService = (productId) => {
  return service.get(`/product/${productId}/details`);
}

const editProductService = (productId, productUpdates) => {
  return service.patch(`/product/${productId}/details`, productUpdates)
}

  export {
    addProductService,
    getUserService,
    editUserService,
    getProductDetailsService,
    editProductService
  }
