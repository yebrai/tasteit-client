import service from "./config.services";

const addProductService = (newProduct) => {
    return service.post("/product/add", newProduct)
  }

  export {
    addProductService
  }