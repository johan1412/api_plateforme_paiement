import http from "../http-common";


const login = data => {
  return http.post("/login", data);
};


const register = data => {
  return http.post("/register", data);
};



export default {
  register,
  login,
};