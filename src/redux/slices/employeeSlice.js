import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// 🟢 1. Import the paginated API function you created
import { getEmployeesPaginated } from "../api/employeeApi";

// 🟢 2. Update Thunk to accept 'page' and 'pageSize'
export const fetchEmployees = createAsyncThunk(
  "employees/fetchPaginated",
  // 🟢 Accept 'search' in the argument object
  async ({ page, pageSize, search }, { rejectWithValue }) => {
    try {
      const response = await getEmployeesPaginated(page, pageSize, search);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch employees");
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    // 🟢 5. Add State fields for Pagination
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    // Optional helper to clear state
    clearList: (state) => {
      state.list = [];
      state.totalRecords = 0;
      state.totalPages = 0;
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        
        // 🟢 6. Map the Backend Response to State
        // action.payload is: { items: [...], totalRecords: 11, totalPages: 1, pageNumber: 1 }
        state.list = action.payload.items || []; 
        state.totalRecords = action.payload.totalRecords || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.pageNumber || 1;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearList } = employeeSlice.actions;
export default employeeSlice.reducer;