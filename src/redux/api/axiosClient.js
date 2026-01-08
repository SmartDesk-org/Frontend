// import axios from "axios";
// import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:5210/api",

//   withCredentials: true,
// });
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
// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // ---------------------------------------------------------
//     // 🛑 FIX: If the error came from the LOGIN endpoint,
//     // simply reject it. Do not try to refresh.
//     // ---------------------------------------------------------
//     if (originalRequest.url.toLowerCase().includes("/login")) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log("calling refresh");

//         // Note: Make sure to use 'axios' here, not 'axiosClient' to avoid infinite loops
//         // if the refresh endpoint itself returns 401.
//         const refreshResponse = await axiosClient.post("/Auth/refresh");

//         console.log("refreshed new token");

//         const newAccessToken = refreshResponse.data; // Adjust based on your actual API response structure

//         if (!newAccessToken) throw new Error("No access token");

//         setAuthToken(newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return axiosClient(originalRequest);
//       } catch (e) {
//         clearAuthToken();
//         // Optionally redirect to login page here
//         // window.location.href = '/login';
//         return Promise.reject(e);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;

// // import axios from "axios";
// // import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken";

// // const axiosClient = axios.create({
// //   baseURL: import.meta.env.VITE_API_BASE_URL,
// //   withCredentials: true, // refresh token cookie
// // });

// // /* ================= REQUEST ================= */

// // axiosClient.interceptors.request.use(
// //   (config) => {
// //     const token = getAuthToken();

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // /* ================= RESPONSE (REFRESH) ================= */

// // axiosClient.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     // 🔴 If access token expired
// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;

// //       try {
// //         console.log("🔄 Access token expired. Calling refresh...");

// //         const refreshResponse = await axios.post(
// //           `${import.meta.env.VITE_API_BASE_URL}/Auth/refresh`,
// //           {},
// //           { withCredentials: true }
// //         );

// //         const newAccessToken =
// //           refreshResponse.data?.data?.accessToken;

// //         if (!newAccessToken) {
// //           throw new Error("No access token returned from refresh");
// //         }

// //         // 🔴 Store new token in memory
// //         setAuthToken(newAccessToken);

// //         // 🔴 Retry original request with new token
// //         originalRequest.headers.Authorization =
// //           `Bearer ${newAccessToken}`;

// //         return axiosClient(originalRequest);
// //       } catch (refreshError) {
// //         console.error("❌ Refresh token failed");

// //         clearAuthToken();
// //         return Promise.reject(refreshError);
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default axiosClient;


import axios from "axios";
// Import your auth helpers
import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken"; // Adjust path if needed

// 1. Create the main client (WITH interceptors)
const axiosClient = axios.create({
  // Use Vite env variable or hardcoded URL
  baseURL: "http://localhost:5210/api", 
  withCredentials: true,
});

// 2. Request Interceptor: Attach Token
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

// 3. Response Interceptor: Handle 401 & Refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛑 STOP: If error is from Login, reject immediately (no refresh)
    if (originalRequest.url.toLowerCase().includes("/login")) {
      return Promise.reject(error);
    }

    // 🛑 STOP: If error is from the Refresh endpoint itself, reject (avoid loop)
    if (originalRequest.url.toLowerCase().includes("/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Access token expired. Calling refresh...");

        // ✅ FIX: Use standard 'axios', NOT 'axiosClient'
        // We must manually pass baseURL and withCredentials here because 
        // standard axios doesn't know your defaults.
        const refreshResponse = await axios.post(
          "http://localhost:5210/api/Auth/refresh", // Full URL required here
          {}, // Empty body
          { withCredentials: true } // Send cookies!
        );

        console.log("✅ Refreshed successfully");

        // Get the new token (Backend returns just the string)
        const newAccessToken = refreshResponse.data; 

        if (!newAccessToken) throw new Error("No access token returned");

        // Save new token
        setAuthToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Use axiosClient to retry (this is safe now)
        return axiosClient(originalRequest);

      } catch (refreshError) {
        console.error("❌ Refresh failed, logging out.");
        clearAuthToken();
        // Optional: Redirect to login
        // window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;