// import axios from "axios";
// import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken";
// import store from "../store";
// /* ================= AXIOS CLIENT ================= */

// const axiosClient = axios.create({
//   baseURL: "http://localhost:5210/api",
//   withCredentials: true, // refresh token cookie

// });

// /* ================= REQUEST INTERCEPTOR ================= */

// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.accessToken;
//     console.log("🔵 [AXIOS] Access token from memory:", token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ================= RESPONSE INTERCEPTOR (REFRESH) ================= */

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 🔴 Do NOT retry refresh endpoint itself
//     if (originalRequest.url.includes("/Auth/refresh")) {
//       return Promise.reject(error);
//     }

//     // 🔴 Access token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log("🔄 [AXIOS] Access token expired. Calling refresh...");

//         // ✅ MUST USE PLAIN AXIOS (NO INTERCEPTORS)
//         const refreshResponse = await axios.post(
//           `http://localhost:5210/api/Auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = refreshResponse.data;

//         if (!newAccessToken) {
//           throw new Error("No access token returned from refresh");
//         }

//         console.log("✅ [AXIOS] New access token received");

//         // 🔴 Store token for next requests
//         setAuthToken(newAccessToken);

//         // 🔴 Retry original request with new token
//         originalRequest.headers.Authorization =
//           `Bearer ${newAccessToken}`;

//         return axiosClient(originalRequest);
//       } catch (refreshError) {
//         console.error("❌ [AXIOS] Refresh token failed");

//         clearAuthToken();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;






//UPDATED ON 2:22 PM -----10/01/26(OLD AXIOSCLIENT IS ON TOP)

// src/api/axiosClient.js
import axios from "axios";
// 🟢 Import your helper functions
import { getAuthToken, setAuthToken, clearAuthToken } from "../authToken"; 
import store from "../store";

/* ================= AXIOS CLIENT ================= */

const axiosClient = axios.create({
  baseURL: "https://localhost:7046/api",
  withCredentials: true, // needed for cookies
});

/* ================= REQUEST INTERCEPTOR ================= */

axiosClient.interceptors.request.use(
  (config) => {
    // 1. Try to get token from Redux first
    let token = store.getState().auth.accessToken;

    // 2. 🟢 FIX: If Redux is empty (Page Refresh), grab from LocalStorage
    if (!token) {
      token = getAuthToken(); // Uses your authToken.js function
    }

    // 3. Attach Header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Optional: Debug log to confirm it's working
      // console.log("🔵 [AXIOS] Attached Token:", token.substring(0, 10) + "...");
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

    // Prevent infinite loops on refresh endpoint
    if (originalRequest.url.includes("/Auth/refresh")) {
      return Promise.reject(error);
    }

    // Handle 401 (Unauthorized) or 403 (Forbidden)
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 [AXIOS] Token expired/missing. Refreshing...");

        // Call Refresh Endpoint
        const refreshResponse = await axios.post(
          `http://localhost:7046/api/Auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Handle different response structures (string vs object)
        const newAccessToken = refreshResponse.data.accessToken || refreshResponse.data;

        if (!newAccessToken) {
          throw new Error("No access token returned");
        }

        // 🟢 Update LocalStorage immediately so subsequent requests work
        setAuthToken(newAccessToken);
        
        // Retry the failed request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);

      } catch (refreshError) {
        console.error("❌ [AXIOS] Refresh failed, logging out.");
        // Clear storage to prevent broken state
        clearAuthToken(); 
        // Optional: Redirect to login
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;