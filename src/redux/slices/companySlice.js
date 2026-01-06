import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCompaniesApi, getCompanyOverviewApi, getPurchaseHistoriesApi,getCompanyFloorsApi,getResourcesByFloorApi } from "../api/companyApi";

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


/* ================= FETCH COMPANY OVERVIEW ================= */

export const fetchCompanyOverview = createAsyncThunk(
  "company/fetchCompanyOverview",
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await getCompanyOverviewApi(companyId);
      return res.data.data; // single overview object
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch company overview"
      );
    }
  }
);



export const fetchCompanyFloors = createAsyncThunk(
  "company/fetchFloors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCompanyFloorsApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch floors");
    }
  }
);

export const fetchResourcesByFloor = createAsyncThunk(
  "company/fetchResourcesByFloor",
  async (floorId, { rejectWithValue }) => {
    try {
      const res = await getResourcesByFloorApi(floorId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch resources");
    }
  }
);



/* ================= Slice ================= */
const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    histories:[],
    overview:null,
    loadingCompanies: false,
    loadingHistories:false,
    loadingOverview:false,
    error: null,
  },
  reducers: {
    clearHistories:state=>{
      state.histories=[];
      state.error=null;
    },
    clearOverview: (state) => {       // ✅ ADD
    state.overview = null;
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
      })
      /* ================= FETCH COMPANY OVERVIEW ================= */

.addCase(fetchCompanyOverview.pending, (state) => {
  state.loadingOverview = true;
  state.error = null;
})
.addCase(fetchCompanyOverview.fulfilled, (state, action) => {
  state.loadingOverview = false;
  state.overview = action.payload;
})
.addCase(fetchCompanyOverview.rejected, (state, action) => {
  state.loadingOverview = false;
  state.error = action.payload;
});




  },
});

export const  {clearHistories,clearOverview} =companySlice.actions;
export default companySlice.reducer;
