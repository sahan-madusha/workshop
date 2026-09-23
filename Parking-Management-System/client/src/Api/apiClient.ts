import axios from "axios";
import { SERVER_API, UNAUTHORIZED_EVENT } from "../Constant";
import { tokenManager, recordLatency } from "../Utils";

export const axiosClientv1 = axios.create({
  baseURL: `${SERVER_API}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClientv1.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    (config as any).__startTime = performance.now();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRedirecting = false;

const handleUnauthorized = () => {
  if (isRedirecting) return;
  isRedirecting = true;

  tokenManager.clearToken();
  localStorage.removeItem("isAuth");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userPermission");

  window.location.href = "/";
};

window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);

axiosClientv1.interceptors.response.use(
  (response) => {
    const start = (response.config as any).__startTime;
    if (typeof start === "number") {
      recordLatency(Math.round(performance.now() - start));
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.endsWith("")) {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    if (error.response) {
      const data = error.response.data;
      if (data && typeof data === "object") {
        if (data.success === undefined) {
          data.success = false;
        }
        if (
          data.error &&
          typeof data.error === "object" &&
          data.error.errors &&
          !data.errors
        ) {
          data.errors = data.error.errors;
        }
      } else {
        error.response.data = {
          success: false,
          message: error.message || "An unexpected error occurred.",
          error: {
            code: error.response.status,
            type: "server_error",
          },
        };
      }
    } else {
      error.response = {
        status: 0,
        statusText: "Network Error",
        headers: {},
        config: error.config,
        data: {
          success: false,
          message: error.message || "Network error. Please try again.",
          error: {
            code: 0,
            type: "network_error",
          },
        },
      };
    }
    return Promise.reject(error);
  },
);
