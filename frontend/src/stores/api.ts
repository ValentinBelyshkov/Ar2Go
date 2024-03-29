import axios from "axios";
import { SERVER_URL } from "../constants";
import { getCookie } from "../utils";

const init = getCookie("access_token");

const api = axios.create({
  baseURL: SERVER_URL,
  headers: init ? { Authorization: "Bearer " + init } : undefined,
});

export default api;
