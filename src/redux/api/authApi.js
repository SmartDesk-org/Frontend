import axiosClient from "./axiosClient";

export const loginApi = async (email, password) => {
  console.log("🔵 [LOGIN API] Sending login request");

  const res = await axiosClient.post("/Auth/login", { email, password });

  console.log("🟢 [LOGIN API] Response received:", res.data);
  return res.data;
};
