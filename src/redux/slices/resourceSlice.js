import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createResourceApi,
  updateResourcePositionApi,
  getResourcesByFloorApi,
  deleteResourceApi,
} from "../api/resourceApi";

/* ================= THUNKS ================= */

/* Fetch resources by floor */
export const fetchResourcesByFloor = createAsyncThunk(
  "resource/fetchByFloor",
  async (floorId, { rejectWithValue }) => {
    try {
      const res = await getResourcesByFloorApi(floorId);
      return Array.isArray(res.data?.data)
        ? res.data.data
        : [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch resources"
      );
    }
  }
);

/* Create resource */
export const createResource = createAsyncThunk(
  "resource/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createResourceApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create resource"
      );
    }
  }
);

/* Update resource position */
export const updateResourcePosition = createAsyncThunk(
  "resource/updatePosition",
  async (payload, { rejectWithValue }) => {
    try {
      await updateResourcePositionApi(payload);
      return payload;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update position"
      );
    }
  }
);

/* Delete resource */
export const deleteResource = createAsyncThunk(
  "resource/delete",
  async (resourceId, { rejectWithValue }) => {
    try {
      await deleteResourceApi(resourceId);
      return resourceId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete resource"
      );
    }
  }
);

/* ================= SLICE ================= */

const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    resources: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearResources(state) {
      state.resources = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch */
      .addCase(fetchResourcesByFloor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResourcesByFloor.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(fetchResourcesByFloor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Create */
      .addCase(createResource.fulfilled, (state) => {
        state.loading = false;
      })

      /* Update position (optimistic) */
      .addCase(updateResourcePosition.fulfilled, (state, action) => {
        const { resourceId, x, y } = action.payload;
        const res = state.resources.find(r => r.id === resourceId);
        if (res) {
          res.x = x;
          res.y = y;
        }
      })

      /* Delete */
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.resources = state.resources.filter(
          r => r.id !== action.payload
        );
      });
  },
});

export const { clearResources } = resourceSlice.actions;
export default resourceSlice.reducer;
