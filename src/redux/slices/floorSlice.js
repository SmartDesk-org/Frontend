import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCompanyFloors,
  createFloorApi,
} from "../api/floorApi";

/* ================= THUNKS ================= */

/* Fetch all floors */
export const fetchFloors = createAsyncThunk(
  "floor/fetchFloors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCompanyFloors();
      console.log("from thunk ",res.data);
      
      return res.data.data; // floors array
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch floors"
      );
    }
  }
);

/* Create new floor */
export const createFloor = createAsyncThunk(
  "floor/createFloor",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createFloorApi(payload);
      return res.data; // { floorId }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create floor"
      );
    }
  }
);

/* ================= SLICE ================= */

const floorSlice = createSlice({
  name: "floor",
  initialState: {
    floors: [],
    activeFloor: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveFloor(state, action) {
      state.activeFloor = action.payload;
    },
    clearFloors(state) {
      state.floors = [];
      state.activeFloor = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch floors */
      .addCase(fetchFloors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFloors.fulfilled, (state, action) => {
        state.loading = false;
        state.floors = action.payload;
        state.activeFloor = action.payload?.[0] || null;
      })
      .addCase(fetchFloors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Create floor */
      .addCase(createFloor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFloor.fulfilled, (state, action) => {
        state.loading = false;

        const newFloor = action.payload?.data;
        if (newFloor) {
            state.floors.push(newFloor);
            state.activeFloor = newFloor; // auto select
          }
        })
      .addCase(createFloor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveFloor, clearFloors } = floorSlice.actions;
export default floorSlice.reducer;
