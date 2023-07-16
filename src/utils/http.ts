import axios from "axios";
import config from "../config";

const http = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export { http as default };

