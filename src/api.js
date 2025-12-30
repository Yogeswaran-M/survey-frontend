import axios from "axios";

const API = axios.create({
  baseURL: "https://election-backend-xw9v.onrender.com",
});

export default API;