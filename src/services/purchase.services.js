import service from "./config.services";

const addPurchaseService = (productArr) => {
  return service.post(`/purchase/add`, productArr);
};

const getPurchaseService = () => {
  return service.get(`/purchase`);
};

export { getPurchaseService, addPurchaseService };
