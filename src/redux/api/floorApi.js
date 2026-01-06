import axiosClient from "../api/axiosClient";

/* ================= GET FLOORS ================= */

export const fetchCompanyFloors = async () => {
  console.log("🟦 [FLOOR API] GET /api/Floor");

  const response = await axiosClient.get("/Floor");

  console.log("🟩 [FLOOR API] Floors fetched:", response.data);
  return response;
};

/* ================= CREATE FLOOR ================= */

export const createFloorApi = async (payload) => {
  console.log("🟦 [FLOOR API] POST /api/Floor", payload);

  const response = await axiosClient.post("/Floor", payload);

  console.log("🟩 [FLOOR API] Floor created:", response.data);
  return response;
};
