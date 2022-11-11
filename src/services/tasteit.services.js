import service from "./config.services";

const getUserService = () => {
  return service.get(`/user/details`);
};

const addProductService = (newProduct) => {
  return service.post("/product/add", newProduct);
};

const getProductDetailsService = (productId) => {
  return service.get(`/product/${productId}/details`);
};

export { addProductService, getUserService, getProductDetailsService };
