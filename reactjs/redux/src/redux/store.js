import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice.js";
export default configureStore({
  reducer: {
    todo: todoSlice,
  },
});
