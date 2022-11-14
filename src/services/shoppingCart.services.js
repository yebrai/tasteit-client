import service from "./config.services";

const getShoppingCartService = () => {
    return service.get(`/user/cart`)
}

const addShoppingCartService = (productId) => {
  return service.patch(`/user/${productId}`);
};

export { getShoppingCartService, addShoppingCartService };
