import http from "../http-common";

const getUserInfos = id => {
    return http.get("/users/${id}");
}

const deleteCredentials = (id) => {
    let data = '';
    return http.patch("/users/${id}", data);
}

const create = data => {
    return http.post("/transactions", data);
};

export default {
  getUserInfos,
  deleteCredentials,
    create
};