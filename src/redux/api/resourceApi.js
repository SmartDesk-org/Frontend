import axiosClient from "./axiosClient";

/* ================= CREATE RESOURCE ================= */
// POST /api/Resource
export const createResourceApi = async (payload) => {
  console.log("🟦 [RESOURCE API] POST /Resource", payload);

  const response = await axiosClient.post("/Resource", payload);

  console.log("🟩 [RESOURCE API] Resource created:", response.data);
  return response;
};

/* ================= UPDATE RESOURCE POSITION ================= */
// PUT /api/Resource/position
export const updateResourcePositionApi = async (payload) => {
  console.log("🟦 [RESOURCE API] PUT /Resource/position", payload);

  const response = await axiosClient.put("/Resource/position", payload);

  console.log("🟩 [RESOURCE API] Resource position updated");
  return response;
};

/* ================= GET RESOURCES BY FLOOR ================= */
// GET /api/Resource/floor/{floorId}
export const getResourcesByFloorApi = async (floorId) => {
  console.log(
    `🟦 [RESOURCE API] GET /Resource/floor/${floorId}`
  );

  const response = await axiosClient.get(
    `/Resource/floor/${floorId}`
  );

  console.log(
    "🟩 [RESOURCE API] Resources fetched:",
    response.data
  );
  return response;
};

/* ================= DELETE RESOURCE ================= */
// DELETE /api/Resource/{resourceId}
export const deleteResourceApi = async (resourceId) => {
  console.log(
    `🟦 [RESOURCE API] DELETE /Resource/${resourceId}`
  );

  const response = await axiosClient.delete(
    `/Resource/${resourceId}`
  );

  console.log(
    "🟩 [RESOURCE API] Resource deleted:",
    resourceId
  );
  return response;
};
