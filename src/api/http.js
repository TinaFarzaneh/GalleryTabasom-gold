import axios from "axios";
import { BASE_URL } from "../config";
import { store } from "../store";
import { refreshTokenThunk } from "../features";

export const api = axios.create({ baseURL: BASE_URL, timeout: 80000 });
api.defaults.baseURL = BASE_URL;

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const { accessToken, isLogin } = state.auth;
    if (isLogin) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log("error http:", error);
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    if (error.response.status === 401 || error.response.status === 403) {
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        store
          .dispatch(refreshTokenThunk({ refreshToken }))
          .unwrap()
          .then((data) => {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(
          "originalRequest.headers",
          originalRequest.headers["Authorization"]
        );
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
