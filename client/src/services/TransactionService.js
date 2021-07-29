import http from "../http-common";

const getAll = () => {
    return http.get("/transactions");
  };
  
  const get = id => {
    return http.get("/transactions/${id}");
  };
  
  const create = data => {
    return http.post("/transactions", data);
  };
  
  const update = (id, data) => {
    return http.patch("/transactions/${id}", data);
  };
  
  const remove = id => {
    return http.delete("/transactions/${id}");
  };

export default {
  getAll,
  get,
  create,
  update,
  remove,
};