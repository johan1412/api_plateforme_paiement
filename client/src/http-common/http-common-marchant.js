import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/",
  // Token à modifier 
  headers: {
    "Content-type": "application/json",
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNmZmE0MTVhOWMxZDAwZGE0ZjZmZjMiLCJpYXQiOjE2MDc0NjYxMzR9.82J5kNEjsnbu6pxAtEKwsIeMO4d5cDBTZfERwXapp4g'
  }
});