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

/* ================= COMPANY OVERVIEW ================= */

export const getCompanyOverviewApi = async (companyId) => {
  console.log("🔵 [COMPANY API] GET /CompanyOverview");

  const res = await axiosClient.get(
    `Company/CompanyOverview/${companyId}`
  );

  console.log("🟢 Company overview fetched:", res.data);
  return res;
};

/* ================= COMPANY OVERVIEW ================= */

export const getSingleCompanyOverviewApi = async () => {
  console.log("🔵 [COMPANY API] GET /SingleCompanyOverview");

  const res = await axiosClient.get(
    `Company/CompanyOverview`
  );

  console.log("🟢 Single Company overview fetched:", res.data);
  return res;
};


/* ================= FLOORS ================= */

export const getCompanyFloorsApi = async () => {
  const res = await axiosClient.get(
    `/Floor`
  );
  return res;
};

/* ================= RESOURCES BY FLOOR ================= */

export const getResourcesByFloorApi = async (floorId) => {
  const res = await axiosClient.get(
    `/Floor/${floorId}/Resources`
  );
  return res;
};


export const renewSubscriptionApi = async (payload) => {
  console.log("🔵 [RENEW API] POST /Company/RenewSubscription");
  console.log("➡️ Payload:", payload);

  const res = await axiosClient.post(
    "/Company/RenewSubscription",
    payload
  );

  console.log("🟢 Renewal response:", res.data);
  return res;
};