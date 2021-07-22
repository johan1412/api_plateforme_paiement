import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNmZmE0MTVhOWMxZDAwZGE0ZjZmZjMiLCJpYXQiOjE2MDc0NjYxMzR9.82J5kNEjsnbu6pxAtEKwsIeMO4d5cDBTZfERwXapp4g'
  }
});