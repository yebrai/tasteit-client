import service from "./config.services";

const getUserService = () => {
  return service.get(`/user/details`)
}
const addProductService = (newProduct) => {
    return service.post("/product/add", newProduct)
  }

  export {
    addProductService,
    getUserService
  }