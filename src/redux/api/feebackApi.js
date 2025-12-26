import axiosClient from "./axiosClient";

/* ================= GET ALL FEEDBACKS (ADMIN) ================= */

export const getAllFeedbacksApi = async () => {
  console.log("🔵 [FEEDBACK API] GET /Feedback");

  const res = await axiosClient.get("/Feedback");
  console.log("🟢 Feedbacks fetched:", res.data);

  return res;
};

/* ================= GET PUBLISHED FEEDBACKS (PUBLIC) ================= */

export const getPublishedFeedbacksApi = async () => {
  console.log("🔵 [FEEDBACK API] GET /Feedback/published");

  const res = await axiosClient.get("/Feedback/published");
  console.log("🟢 Published feedbacks fetched:", res.data);

  return res;
};

/* ================= GET FEEDBACKS BY COMPANY (COMPANY ADMIN) ================= */

export const getFeedbacksByCompanyApi = async () => {
  console.log("🔵 [FEEDBACK API] GET /Feedback/GetAllForCompany");

  const res = await axiosClient.get(
    `/Feedback/GetAllForCompany`
  );

  console.log("🟢 Company feedbacks fetched:", res.data);
  return res;
};

/* ================= ADD FEEDBACK ================= */

export const addFeedbackApi = async (payload) => {
  console.log("🔵 [FEEDBACK API] POST /Feedback", payload);

  const res = await axiosClient.post("/Feedback", payload);
  return res;
};

/* ================= TOGGLE PUBLISH ================= */

export const togglePublishFeedbackApi = async (id) => {
  console.log("🔵 [FEEDBACK API] PATCH /Feedback/toggle", id);

  const res = await axiosClient.patch(`/Feedback/${id}/toggle-publish`);
  return res;
};

/* ================= DELETE FEEDBACK ================= */

export const deleteFeedbackApi = async (id) => {
  console.log("🔵 [FEEDBACK API] DELETE /Feedback", id);

  const res = await axiosClient.delete(`/Feedback/${id}`);
  return res;
};
