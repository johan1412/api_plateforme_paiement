import http from "../http-common/http-common-admin";

const getAll = () => {
  return http.get("/transaction");
};

const get = id => {
  return http.get(`/transaction/${id}`);
};

const create = data => {
  return http.post("/transaction", data);
};

const update = (id, data) => {
  return http.patch(`/transaction/${id}`, data);
};

const remove = id => {
  return http.delete(`/transaction/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};