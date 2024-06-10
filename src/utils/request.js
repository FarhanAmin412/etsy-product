import axios from "axios";
import NProgress from "nprogress";
import { config } from "./config";
import { toastify } from "./toast";

let isToastShown = false;

const request = axios.create({
  baseURL: config.apiUrl,
  timeout: 20 * 60 * 1000,
});
// debugger;

request.interceptors.request.use(
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

request.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();

    if (error.code === "ECONNABORTED") {
      toastify("error", `${error.message}. Please try again`);
    }
    console.log(error.response.data, "error.response.data");
    // check if error is section timeout
    // if (error?.response?.data?.message === "Unauthenticated.") {
    //   if (!isToastShown) {
    //     toastify(
    //       "error",
    //       `Your Session is expired. You are being logged out...`
    //     );
    //     isToastShown = true; // Set the flag to true to indicate that the toast has been shown
    //     setTimeout(() => {
    //       window.location.href = "/login";
    //     }, 10000);
    //   }
    // }

    return Promise.reject(error);
  }
);

export default request;
