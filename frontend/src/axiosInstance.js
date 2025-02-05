import axios from "axios";

const instance = axios.create({
//  baseURL: "http://localhost:8080/api",
   baseURL: "/api",
  timeout: 1000000,
});

export default instance;
