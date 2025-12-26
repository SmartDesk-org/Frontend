import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCompaniesApi, getPurchaseHistoriesApi } from "../api/companyApi";

/* ================= FETCH ================= */

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCompaniesApi();
      return res.data.data; // companies array
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch companies"
      );
    }
  }
);


/* ================= FETCH  Histories================= */

export const fetchHistories = createAsyncThunk(
  "company/fetchHistories",
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await getPurchaseHistoriesApi(companyId);
      return res.data.data; // histories array
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch companies"
      );
    }
  }
);
/* ================= Slice ================= */
const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    histories:[],
    loadingCompanies: false,
    loadingHistories:false,
    error: null,
  },
  reducers: {
    clearHistories:state=>{
      state.histories=[];
      state.error=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loadingCompanies = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loadingCompanies = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loadingCompanies = false;
        state.error = action.payload;
      })
      .addCase(fetchHistories.pending, (state) => {
        state.loadingHistories = true;
        state.error = null;
      })
      .addCase(fetchHistories.fulfilled, (state, action) => {
        state.loadingHistories = false;
        state.histories = action.payload;
      })
      .addCase(fetchHistories.rejected, (state, action) => {
        state.loadingHistories = false;
        state.error = action.payload;
      });
  },
});

export const  {clearHistories} =companySlice.actions;
export default companySlice.reducer;
