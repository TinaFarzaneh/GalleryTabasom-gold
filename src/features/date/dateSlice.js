import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
  name: "date",
  initialState: "",
  reducers: {
    saveDate: (state, action) => {
      state.date = action.payload;
    },
    removeDate: (state) => {
      state.date = "";
    },
  },
});

export const { saveDate, removeDate } = dateSlice.actions;

export default dateSlice.reducer;
