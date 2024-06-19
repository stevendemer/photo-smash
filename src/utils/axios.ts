import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 8000,
  validateStatus: (status) => status === 200,
  params: {
    client_id: import.meta.env.VITE_ACCESS_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
