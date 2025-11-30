import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("token");
  if (user) req.headers.Authorization = `Bearer ${user}`;
  return req;
});

export default API;
