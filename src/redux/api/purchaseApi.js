import axiosClient from "../api/axiosClient";

export const createCompanyWithSubscriptionApi = async (payload) => {
  console.log("🟦 [PURCHASE API] Request payload:", payload);

  const response = await axiosClient.post("/Company/NewCompany", payload);

  console.log("🟩 [PURCHASE API] Response:", response.data);
  return response;
};
