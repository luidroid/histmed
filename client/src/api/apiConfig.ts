import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.129:3001",
  headers: { Accept: "application/json" },
});
