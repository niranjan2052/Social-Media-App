import { createSlice } from "@reduxjs/toolkit";
import { fromStorage } from "../lib";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: JSON.parse(fromStorage("user")) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = null;
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;
