import axios from "axios";

export const baseConfig = {
  baseURL: "http://localhost:4000/",
};

export function fetch({ method = "get", endpoint, options = {} }) {
  return axios[method](endpoint, { ...baseConfig, endpoint, ...options });
}
