import axios from "axios";
import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken";

const axiosClient = axios.create({

baseURL: "http://localhost:5210/api",

  withCredentials: true
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔴 MUST USE axiosClient (proxy)
        console.log("calling refresh");
        
        const refreshResponse = await axiosClient.post("/Auth/refresh");
        console.log("rfresheed new token"+ refreshResponse.data);
        
        const newAccessToken =
          refreshResponse.data;

        if (!newAccessToken) throw new Error("No access token");

        setAuthToken(newAccessToken);
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (e) {
        clearAuthToken();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;


// import axios from "axios";
// import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken";

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true, // refresh token cookie
// });

// /* ================= REQUEST ================= */

// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ================= RESPONSE (REFRESH) ================= */

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 🔴 If access token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log("🔄 Access token expired. Calling refresh...");

//         const refreshResponse = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}/Auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken =
//           refreshResponse.data?.data?.accessToken;

//         if (!newAccessToken) {
//           throw new Error("No access token returned from refresh");
//         }

//         // 🔴 Store new token in memory
//         setAuthToken(newAccessToken);

//         // 🔴 Retry original request with new token
//         originalRequest.headers.Authorization =
//           `Bearer ${newAccessToken}`;

//         return axiosClient(originalRequest);
//       } catch (refreshError) {
//         console.error("❌ Refresh token failed");

//         clearAuthToken();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
