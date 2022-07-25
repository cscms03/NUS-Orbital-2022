import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import userReducer from "./features/user";
import profileReducer from "./features/profile";

const store = configureStore({
  reducer,
  user: userReducer,
  profile: profileReducer,
});

export default store;
