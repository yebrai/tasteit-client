import service from "./config.services";

const getUserService = () => {
  return service.get(`/user/details`)
}

const getProductsService = () => {
  return service.get(`/product`)
}

const getProductTypeService = (type) => {
  return service.get(`/product/${type}`)
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

const deleteProductService = (productId) => {
  return service.delete(`/product/${productId}`)
}

const addCommentService = (productId, newComment) => {
  return service.post(`/comment/${productId}/add`, newComment)
}

const getCommentService = (productId) => {
  return service.get(`/comment/${productId}`)
}

  export {
    getProductsService,
    getProductTypeService,
    addProductService,
    getUserService,
    editUserService,
    getProductDetailsService,
    editProductService,
    deleteProductService,
    addCommentService,
    getCommentService
  }
