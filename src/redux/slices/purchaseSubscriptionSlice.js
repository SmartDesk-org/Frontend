import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCompanyWithSubscriptionApi } from "../api/purchaseApi";

/* ================= SUBMIT PURCHASE ================= */

export const submitPurchase = createAsyncThunk(
  "purchase/submitPurchase",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("🟦 [THUNK] submitPurchase started");

      const res = await createCompanyWithSubscriptionApi(payload);

      console.log("🟩 [THUNK] submitPurchase success:", res.data);
      return res.data;
    } catch (err) {
      console.error("🟥 [THUNK] submitPurchase error:", err);
      return rejectWithValue(
        err.response?.data?.message || "Purchase failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const purchaseSubscriptionSlice = createSlice({
  name: "purchase",
  initialState: {
    form: {
      name: "",
      address: "",
      email: "",
      password: "",
      months: 0,
      years: 0,
    },
    loading: false,
    error: null,
    success: false,
    companyId: null,
  },
  reducers: {
    updatePurchaseField: (state, action) => {
      const { name, value } = action.payload;
      console.log(`🟨 [REDUCER] updatePurchaseField → ${name}:`, value);
      state.form[name] = value;
    },
    resetPurchase: (state) => {
      console.log("🟨 [REDUCER] resetPurchase");
      state.form = {
        name: "",
        address: "",
        email: "",
        password: "",
        months: 0,
        years: 0,
      };
      state.loading = false;
      state.error = null;
      state.success = false;
      state.companyId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPurchase.pending, (state) => {
        console.log("🟦 [REDUCER] submitPurchase.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPurchase.fulfilled, (state, action) => {
        console.log("🟩 [REDUCER] submitPurchase.fulfilled");
        state.loading = false;
        state.success = true;
        state.companyId = action.payload.data.companyId;
      })
      .addCase(submitPurchase.rejected, (state, action) => {
        console.error(
          "🟥 [REDUCER] submitPurchase.rejected:",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updatePurchaseField, resetPurchase } =
  purchaseSubscriptionSlice.actions;

export default purchaseSubscriptionSlice.reducer;
