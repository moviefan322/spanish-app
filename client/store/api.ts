import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
  },
});

export default instance;
