import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices";
const store = configureStore({ reducer: appReducer });

export default store;
