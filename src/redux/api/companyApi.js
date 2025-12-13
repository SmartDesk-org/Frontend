import axiosClient from "./axiosClient";

/* ================= GET ALL COMPANIES ================= */

export const getAllCompaniesApi = async () => {
  console.log("🔵 [COMPANY API] GET /Company/GetAll");

  const res = await axiosClient.get("/Company/GetAll");

  console.log("🟢 Companies fetched:", res.data);
  return res;
};
