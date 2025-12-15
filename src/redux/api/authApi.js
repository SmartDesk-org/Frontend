import axiosClient from "./axiosClient";

export const loginApi = async (email, password) => {
  console.log(" [LOGIN API] Sending login request");

  const res = await axiosClient.post("/Auth/login", { email, password });

  console.log(" [LOGIN API] Response received:", res.data);
  return res.data;
};

// 🔴 ADD THIS
export const forgotPasswordApi = async (email) => {

  console.log(" [forgotPassword API] Sending  request");

  const res = await axiosClient.post("/Auth/forgot-password", { email });

  console.log(" [forgotPassword API] Response received",res.data);
  return res.data;
};

// 🔴 ADD THIS (for reset screen)
export const resetPasswordApi = async (token, newPassword) => {

  console.log(" [reset API] Sending  request");

  const res = await axiosClient.post("/Auth/reset-password", {
    token,
    newPassword,
  });

  console.log(" [reset API] Response received",res.data);

  return res.data;
};
