import { createSlice } from "@reduxjs/toolkit";

const companySubSlice = createSlice({
  name: "subscription",
  initialState: {
    plan: "Basic",
    expiry: "2027-02-13",
    usage: {
      employees: "8 / 10",
      desks: "15 / 20",
    },
  },
  reducers: {},
});

export default companySubSlice.reducer;
