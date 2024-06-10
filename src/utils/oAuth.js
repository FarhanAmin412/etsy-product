import axios from "axios";
import NProgress from "nprogress";
import { config } from "./config";
import { toastify } from "./toast";

const oAuthRequest = axios.create({
  baseURL: config.oAuthUrl,
  timeout: 20 * 60 * 1000,
});
// debugger;

oAuthRequest.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
    NProgress.start();
    return config;
  },
  (error) => {
    NProgress.done();

    return Promise.reject(error);
  }
);

oAuthRequest.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();

    if (error.code === "ECONNABORTED") {
      toastify("error", `${error.message}. Please try again`);
    }

    return Promise.reject(error);
  }
);

export default oAuthRequest;
