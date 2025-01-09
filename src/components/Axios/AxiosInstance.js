import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || "http://localhost:4000/api/v1",
});

export { instance };
