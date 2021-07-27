import http from "../http-common";

const getUserInfos = id => {
    return http.get("/users/${id}");
}

const deleteCredentials = (id) => {
    let data = '';
    return http.patch("/users/${id}", data);
}



export default {
  getUserInfos,
  deleteCredentials,
};