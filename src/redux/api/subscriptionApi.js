import axiosClient from "../api/axiosClient";

export const getAllPlansApi = async () => {
  console.log("🔵 [SUBSCRIPTION API] getAllPlansApi() called");

  try {
    console.log("🔵 [REQUEST] Sending GET /Subscription");
    console.log("🔵 Base URL:", axiosClient.defaults.baseURL);
    console.log("🔵 With Credentials:", axiosClient.defaults.withCredentials);

    const response = await axiosClient.get("/Subscription");

    console.log("🟢 [RESPONSE SUCCESS]");
    console.log("🟢 Status:", response.status);
    console.log("🟢 Data:", response.data);

    return response;
  } catch (error) {
    console.log("🔴 [RESPONSE ERROR]");

    if (error.response) {
      console.log("🔴 Status:", error.response.status);
      console.log("🔴 Data:", error.response.data);
      console.log("🔴 Headers:", error.response.headers);
    } else if (error.request) {
      console.log("🔴 No response received from server");
      console.log(error.request);
    } else {
      console.log("🔴 Error setting up request:", error.message);
    }

    throw error;
  }
};
