import service from "./config.services";

const getShoppingCartService = () => {
  return service.get(`/user/cart`);
};

const addShoppingCartService = (productArr) => {
  return service.patch(`/user/cart/add`, productArr);
};

const deleteShoppingCartService = (productId) => {
  return service.delete(`/user/cart/${productId}/delete`);
};

const deleteAllShoppingCartService = () => {
  return service.delete(`/user/cart/delete`);
};

const sendStripePaymentService = (information) => {
  return service.post("/stripe", information);
};

export {
  getShoppingCartService,
  addShoppingCartService,
  deleteShoppingCartService,
  deleteAllShoppingCartService,
  sendStripePaymentService,
};
