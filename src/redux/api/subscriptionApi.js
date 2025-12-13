import axiosClient from "../api/axiosClient";

/* ================= GET ALL PLANS ================= */

export const getAllPlansApi = async () => {
  console.log("🔵 [SUBSCRIPTION API] getAllPlansApi()");

  const response = await axiosClient.get("/Subscription");

  console.log("🟢 [GET] /Subscription", response.data);
  return response;
};

/* ================= CREATE PLAN ================= */

export const createPlanApi = async (payload) => {
  console.log("🔵 [SUBSCRIPTION API] createPlanApi()");
  console.log("➡️ Payload:", payload);

  const response = await axiosClient.post("/Subscription", payload);

  console.log("🟢 [POST] /Subscription", response.data);
  return response;
};

/* ================= UPDATE PLAN ================= */

export const updatePlanApi = async (id, payload) => {
  console.log("🔵 [SUBSCRIPTION API] updatePlanApi()");
  console.log(`➡️ PUT /Subscription/${id}`);
  console.log("➡️ Payload:", payload);

  const response = await axiosClient.put(`/Subscription/${id}`, payload);

  console.log(`🟢 [PUT] /Subscription/${id}`, response.data);
  return response;
};

/* ================= DELETE PLAN ================= */

export const deletePlanApi = async (id) => {
  console.log("🔵 [SUBSCRIPTION API] deletePlanApi()");
  console.log(`➡️ DELETE /Subscription/${id}`);

  const response = await axiosClient.delete(`/Subscription/${id}`);

  console.log(`🟢 [DELETE] /Subscription/${id}`, response.data);
  return response;
};
