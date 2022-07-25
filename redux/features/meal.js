import { createSlice } from "@reduxjs/toolkit";

const mealSlice = createSlice({
  name: "setMeal",
  initialState: {
    value: {
      name: "",
    },
  },
  reducers: {
    setMeal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMeal } = mealSlice.actions;

export default mealSlice.reducer;
