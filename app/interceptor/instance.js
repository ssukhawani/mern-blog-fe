import axios from "axios";
import { toastMessage } from "../constants/toastMessage";
import LocalStorageRepository from "../utils/storage";
import { handleErrorToast } from "../utils/helperFunc";
import { logMessage } from "../constants/logMessage";
import { toast } from "react-toastify";
import Error from "../error";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  timeout: 15000,
  timeoutErrorMessage: toastMessage.SERVER_NOT_RESPONDING,
});

// Function to log messages in development mode
const logOnDev = (message) => {
  if (process.env.NEXT_PUBLIC_ENV === "development") {
    console.log(message);
  }
};

// Interceptor for request handling
const onRequest = (config) => {
  const { method, url } = config;
  const user = LocalStorageRepository.get("blog_user");

  // Attach authorization headers if token exists
  if (user && user.token) {
    config.headers["auth-token"] = `${user.token}`;
  }

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

  return config;
};

// Interceptor for response handling
const onResponse = (response) => {
  const { method, url } = response.config;
  const { status } = response;

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response;
};

// Error handling function for response errors
const onResponseError = async (error) => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config || {};
    const { status, message } = error.response || {};

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
    );

    // Handle response error statuses
    switch (status) {
      case 400:
        logOnDev(logMessage.BAD_REQUEST);
        break;
      case 401:
        logOnDev(logMessage.UN_AUTHORIZED);
        LocalStorageRepository.delete("findex_user");
        LocalStorageRepository.delete("login-popup");

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
        break;
      case 403:
        logOnDev(logMessage.PERMISSION_DENIED);
        break;
      case 404:
        logOnDev(logMessage.INVALID_REQUEST);
        break;
      case 500:
        logOnDev(logMessage.SERVER_ERROR);
        break;
      default:
        logOnDev(logMessage.UNKNOWN_ERROR);
        break;
    }
  } else {
    logOnDev(`🚨 [API] | Response Error ${error.message}`);
  }

  return await Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onResponseError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
