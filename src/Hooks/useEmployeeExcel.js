import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axiosClient from "../redux/api/axiosClient";
import { downloadEmployeeTemplate } from "../redux/api/employeeApi";

export const useEmployeeExcel = (onUploadSuccess) => {
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [downloadingTemplate, setDownloadingTemplate] = useState(false);
  const [notification, setNotification] = useState(null);
  const fileRef = useRef(null);

  // Auto-dismiss notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // 1. Parse Excel
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        
        if (data.length === 0) throw new Error("Sheet is empty");
        setPreview(data);
        showNotification("info", `Loaded ${data.length} rows for review.`);
      } catch (err) {
        showNotification("danger", "Failed to parse Excel file.");
      }
    };
    reader.readAsBinaryString(file);
  };

  // 2. Upload to Server
  const confirmUpload = async () => {
    const file = fileRef.current?.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("File", file);

    try {
      const res = await axiosClient.post("/Employee/bulk-upload", formData);
      const result = res.data?.data;

      if (!result || result.successfulRecords === 0) throw { response: { data: res.data } };

      showNotification("success", `Success! Uploaded ${result.successfulRecords} employees.`);
      cancelUpload();
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      const api = err?.response?.data;
      let msg = api?.message || "Upload failed";
      if (api?.data?.errors?.length) {
        msg = `Row ${api.data.errors[0].rowNumber}: ${api.data.errors[0].error}`;
      }
      showNotification("danger", msg);
    } finally {
      setUploading(false);
    }
  };


  const downloadTemplate = async () => {
    try {
      setDownloadingTemplate(true);
      const response = await downloadEmployeeTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Employee_Upload_Template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      showNotification("success", "Template downloaded.");
    } catch (err) {
      showNotification("danger", "Failed to download template.");
    } finally {
      setDownloadingTemplate(false);
    }
  };

  const cancelUpload = () => {
    setPreview([]);
    if (fileRef.current) fileRef.current.value = "";
  };

  return {
    fileRef,
    preview,
    notification,
    uploading,
    downloadingTemplate,
    handleExcelUpload,
    confirmUpload,
    downloadTemplate,
    cancelUpload,
    setNotification: showNotification 
  };
};