import service from "./config.services";

const getShoppingCartService = () => {
  return service.get(`/user/cart`)
}

const addShoppingCartService = (productArr) => {
  return service.patch(`/user/cart/add`, productArr);
};

export { getShoppingCartService, addShoppingCartService };
