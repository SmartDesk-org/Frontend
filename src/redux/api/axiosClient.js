import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// ==========================
// REQUEST LOGGING
// ==========================
axiosClient.interceptors.request.use(
  (config) => {
    console.log("%c[API REQUEST]", "color: blue; font-weight: bold;");
    console.log("URL:", config.baseURL + config.url);
    console.log("Method:", config.method.toUpperCase());
    console.log("Headers:", config.headers);
    console.log("Data:", config.data);
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// ==========================
// RESPONSE LOGGING
// ==========================
axiosClient.interceptors.response.use(
  (response) => {
    console.log("%c[API RESPONSE]", "color: green; font-weight: bold;");
    console.log("URL:", response.config.url);
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.error("%c[API RESPONSE ERROR]", "color: red; font-weight: bold;");

    if (error.response) {
      // Backend error
      console.error("URL:", error.response.config.url);
      console.error("Status:", error.response.status);
      console.error("Response:", error.response.data);
    } else if (error.request) {
      // No response received
      console.error("NO RESPONSE RECEIVED:", error.request);
    } else {
      // Something else
      console.error("ERROR:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
