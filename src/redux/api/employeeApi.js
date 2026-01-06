import axiosClient from "./axiosClient";

export const bulkUploadEmployees = (employees) => {
  return axiosClient.post("/Employee/bulk-upload", employees);
};

export const getEmployees = () => {
  return axiosClient.get("/Employee");
};

export const downloadEmployeeTemplate = () => {
  return axiosClient.get("/Employee/upload-template", {
    responseType: "blob",
  });
};

export const addEmployee = (employeeData) => {
  return axiosClient.post("/Employee", employeeData);
};