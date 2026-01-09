import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCompaniesApi,
  getCompanyOverviewApi,
  getSingleCompanyOverviewApi,
  getPurchaseHistoriesApi,
  getCompanyFloorsApi,
  getResourcesByFloorApi,
  renewSubscriptionApi
} from "../api/companyApi";

/* ================= FETCH COMPANIES ================= */

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCompaniesApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch companies"
      );
    }
  }
);

/* ================= FETCH HISTORIES ================= */

export const fetchHistories = createAsyncThunk(
  "company/fetchHistories",
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await getPurchaseHistoriesApi(companyId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch histories"
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
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch company overview"
      );
    }
  }
);

export const fetchSingleCompanyOverview = createAsyncThunk(
  "company/fetchSingleCompanyOverview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getSingleCompanyOverviewApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch company overview"
      );
    }
  }
);

/* ================= FLOORS ================= */

export const fetchCompanyFloors = createAsyncThunk(
  "company/fetchFloors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCompanyFloorsApi();
      return res.data.data;
    } catch {
      return rejectWithValue("Failed to fetch floors");
    }
  }
);

/* ================= RESOURCES ================= */

export const fetchResourcesByFloor = createAsyncThunk(
  "company/fetchResourcesByFloor",
  async (floorId, { rejectWithValue }) => {
    try {
      const res = await getResourcesByFloorApi(floorId);
      return res.data.data;
    } catch {
      return rejectWithValue("Failed to fetch resources");
    }
  }
);

/* ================= SUBMIT RENEWAL ================= */

export const submitRenewal = createAsyncThunk(
  "company/submitRenewal",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await renewSubscriptionApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Renewal failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const companySlice = createSlice({
  name: "company",
  initialState: {
    /* DATA */
    companies: [],
    histories: [],
    overview: null,

    /* LOADING FLAGS */
    loadingCompanies: false,
    loadingHistories: false,
    loadingOverview: false,
    loadingRenewal: false,

    /* STATUS */
    renewalSuccess: false,
    error: null,
  },

  reducers: {
    clearHistories: (state) => {
      state.histories = [];
      state.error = null;
    },
    clearOverview: (state) => {
      state.overview = null;
    },
    resetRenewalState: (state) => {
      state.loadingRenewal = false;
      state.renewalSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ================= COMPANIES ================= */
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

      /* ================= HISTORIES ================= */
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

      /* ================= OVERVIEW ================= */
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
      })
      .addCase(fetchSingleCompanyOverview.pending, (state) => {
        state.loadingOverview = true;
        state.error = null;
      })
      .addCase(fetchSingleCompanyOverview.fulfilled, (state, action) => {
        state.loadingOverview = false;
        state.overview = action.payload;
      })
      .addCase(fetchSingleCompanyOverview.rejected, (state, action) => {
        state.loadingOverview = false;
        state.error = action.payload;
      })
      


      /* ================= RENEWAL ================= */
      .addCase(submitRenewal.pending, (state) => {
        state.loadingRenewal = true;
        state.renewalSuccess = false;
        state.error = null;
      })
      .addCase(submitRenewal.fulfilled, (state) => {
        state.loadingRenewal = false;
        state.renewalSuccess = true;
      })
      .addCase(submitRenewal.rejected, (state, action) => {
        state.loadingRenewal = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearHistories,
  clearOverview,
  resetRenewalState,
} = companySlice.actions;

export default companySlice.reducer;
