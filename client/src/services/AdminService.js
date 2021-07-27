import http from "../http-common";

const getAll = () => {
  return http.get("http://localhost:3001/transactions");
};

const get = id => {
  return http.get(`/admin/transaction/${id}`);
};



export default {
  getAll,
  get,
};