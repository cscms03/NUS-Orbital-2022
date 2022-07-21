import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "setProfile",
  initialState: {
    value: {
      name: "",
      age: 0,
      weight: 0,
      gender: "",
    },
  },
  reducers: {
    setProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
