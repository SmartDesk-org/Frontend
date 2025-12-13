import { createSlice } from "@reduxjs/toolkit";

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    desks: [
      { id: 1, code: "D-01", status: "Available" },
      { id: 2, code: "D-02", status: "Occupied" },
    ],
    rooms: [{ id: 1, name: "Room A", capacity: 6 }],
  },
  reducers: {},
});

export default resourceSlice.reducer;
