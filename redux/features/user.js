import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      email: "",
      password: "",
    },
  },
  reducers: {
    signUp: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { signUp } = userSlice.actions;

export default userSlice.reducer;
