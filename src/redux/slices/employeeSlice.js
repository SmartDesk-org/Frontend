import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [
      { id: 1, name: "Aman", email: "aman@corp.com", isActive: true },
      { id: 2, name: "Rahul", email: "rahul@corp.com", isActive: false },
    ],
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
