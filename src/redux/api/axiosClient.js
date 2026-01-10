import axios from "axios";
import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken";
import store from "../store";
/* ================= AXIOS CLIENT ================= */

const axiosClient = axios.create({
  baseURL: "http://localhost:5210/api",
  withCredentials: true, // refresh token cookie

});

/* ================= REQUEST INTERCEPTOR ================= */

axiosClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    console.log("🔵 [AXIOS] Access token from memory:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR (REFRESH) ================= */

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔴 Do NOT retry refresh endpoint itself
    if (originalRequest.url.includes("/Auth/refresh")) {
      return Promise.reject(error);
    }

    // 🔴 Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 [AXIOS] Access token expired. Calling refresh...");

        // ✅ MUST USE PLAIN AXIOS (NO INTERCEPTORS)
        const refreshResponse = await axios.post(
          `http://localhost:5210/api/Auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh");
        }

        console.log("✅ [AXIOS] New access token received");

        // 🔴 Store token for next requests
        setAuthToken(newAccessToken);

        // 🔴 Retry original request with new token
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ [AXIOS] Refresh token failed");

        clearAuthToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;