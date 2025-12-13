import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: {
    floorName: "Main Floor",
    resources: [
      { id: 1, type: "Desk", x: 1, y: 1, status: "Available" },
      { id: 2, type: "Desk", x: 2, y: 1, status: "Occupied" },
      { id: 3, type: "MeetingRoom", x: 1, y: 2, status: "Available" },
    ],
  },
  reducers: {},
});

export default floorSlice.reducer;
