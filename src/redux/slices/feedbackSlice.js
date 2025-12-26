import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllFeedbacksApi,
  getPublishedFeedbacksApi,
  addFeedbackApi,
  togglePublishFeedbackApi,
  deleteFeedbackApi,
  getFeedbacksByCompanyApi,
} from "../api/feebackApi";

/* ================= FETCH ALL ================= */

export const fetchAllFeedbacks = createAsyncThunk(
  "feedback/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllFeedbacksApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch feedbacks"
      );
    }
  }
);

/* ================= FETCH PUBLISHED ================= */

export const fetchPublishedFeedbacks = createAsyncThunk(
  "feedback/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPublishedFeedbacksApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch published feedbacks"
      );
    }
  }
);

/* ================= ADD ================= */

export const addFeedback = createAsyncThunk(
  "feedback/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addFeedbackApi(payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add feedback"
      );
    }
  }
);

/* ================= TOGGLE PUBLISH ================= */

export const togglePublishFeedback = createAsyncThunk(
  "feedback/togglePublish",
  async (id, { rejectWithValue }) => {
    try {
      await togglePublishFeedbackApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle publish"
      );
    }
  }
);

/* ================= DELETE ================= */

export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteFeedbackApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete feedback"
      );
    }
  }
);


/* ================= FETCH BY COMPANY ================= */

export const fetchFeedbacksByCompany = createAsyncThunk(
  "feedback/fetchByCompany",
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await getFeedbacksByCompanyApi(companyId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch company feedbacks"
      );
    }
  }
);



/* ================= SLICE ================= */

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFeedbackError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchAllFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* PUBLISHED */
      .addCase(fetchPublishedFeedbacks.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      /* ADD */
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      /* TOGGLE */
      .addCase(togglePublishFeedback.fulfilled, (state, action) => {
        const item = state.list.find((x) => x.id === action.payload);
        if (item) item.isPublished = !item.isPublished;
      })

      /* DELETE */
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.list = state.list.filter((x) => x.id !== action.payload);
      })
            /* FETCH BY COMPANY */
      .addCase(fetchFeedbacksByCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacksByCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFeedbacksByCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearFeedbackError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
