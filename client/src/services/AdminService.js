import http from "../http-common";

const getAll = () => {
  return http.get("/admin/transaction");
};

const get = id => {
  return http.get(`/admin/transaction/${id}`);
};



export default {
  getAll,
  get,
};