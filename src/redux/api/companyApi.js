import axiosClient from "./axiosClient";

/* ================= GET ALL COMPANIES ================= */

export const getAllCompaniesApi = async () => {
  console.log("🔵 [COMPANY API] GET /Company/GetAll");

  const res = await axiosClient.get("/Company/GetAll");

  console.log("🟢 Companies fetched:", res.data);
  return res;
};

/* ================= GET PURCAHSE HISTORIES FOR A COMPANY ================= */

export const getPurchaseHistoriesApi = async (companyId) => {
  console.log("🔵 [COMPANY API] GET /History/GetAll");

  const res = await axiosClient.get(`/History/GetAll?companyId=${companyId}`);

  console.log("🟢 histories fetched:", res.data);
  return res;
};
