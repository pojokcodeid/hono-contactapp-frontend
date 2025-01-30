import axios from "axios";
import secureLocalStorage from "react-secure-storage";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = import.meta.env.VITE_API_TIMEOUT;
axios.defaults.headers.common["Content-Type"] = "application/json";

const api = axios.create();
export interface FailedRequest {
  headers: { [key: string]: string };
  url: string;
}

api.interceptors.request.use((request) => {
  const token = secureLocalStorage.getItem("acessToken");
  if (token) {
    request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
});

// Refresh token logic
const refreshAuthLogic = async (failedRequest: FailedRequest) => {
  try {
    const headersList = {
      Authorization: "Bearer " + secureLocalStorage.getItem("refreshToken"),
      "Content-Type": "application/json",
    };

    const reqOptions = {
      url: `/api/refresh`,
      method: "GET",
      headers: headersList,
    };
    const response = await axios.request(reqOptions);
    secureLocalStorage.setItem("acessToken", response.data.data.token);
    secureLocalStorage.setItem("refreshToken", response.data.data.refreshToken);
    secureLocalStorage.setItem("user", {
      id: response.data.data.id,
      name: response.data.data.name,
      email: response.data.data.email,
    });
    console.log("Simpan token baru berhasil ...");
    failedRequest.headers["Authorization"] =
      "Bearer " + response.data.data.token;
    return Promise.resolve();
  } catch (error) {
    secureLocalStorage.clear();
    window.location.href = "/";
    return Promise.reject(error);
  }
};

// Interceptor untuk refresh token ketika access token expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAuthLogic(originalRequest);
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;
export const axiosInstance = api;
