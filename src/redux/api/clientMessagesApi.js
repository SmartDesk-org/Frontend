import axiosClient from "./axiosClient";

// GET all client messages (Admin)
export const getClientMessages = () => {
  console.log("📨 [API] Fetching client messages");
  return axiosClient.get("/ClientMessage");
};

export const submitClientMessage = (data) => {
  console.log("📤 [API] Submitting client message", data);
  return axiosClient.post("/ClientMessage", data);
};

// Toggle read status (Admin)
export const toggleReadMessage = (id) => {
  console.log(`📘 [API] Toggle read status | ID: ${id}`);
  return axiosClient.put(`/ClientMessage/${id}/toggle-read`);
};

// Toggle important status (Admin)
export const toggleImportantMessage = (id) => {
  console.log(`⭐ [API] Toggle important status | ID: ${id}`);
  return axiosClient.put(`/ClientMessage/${id}/toggle-important`);
};

// Delete message (Admin)
export const deleteMessage = (id) => {
  console.log(`🗑️ [API] Delete message | ID: ${id}`);
  return axiosClient.delete(`/ClientMessage/${id}`);
};
