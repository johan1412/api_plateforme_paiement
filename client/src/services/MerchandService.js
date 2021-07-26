import http from "../http-common";

const getAll = () => {
  return http.get("/merchand/transaction");
};

const get = id => {
  return http.get("/merchand/transaction/${id}");
};

const create = data => {
  return http.post("/merchand/transaction", data);
};

const update = (id, data) => {
  return http.patch("/merchand/transaction/${id}", data);
};

const remove = id => {
  return http.delete("/merchand/transaction/${id}");
};

const getUserInfos = id => {
    return http.get("/users/${id}");
}

const deleteCredentials = (id, data) => {
    return http.patch("/users/${id}", data);
}



export default {
  getAll,
  get,
  create,
  update,
  remove,
  getUserInfos,
  deleteCredentials,
};