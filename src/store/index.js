import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postSlice";
import userReducer from "./userSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    user: userSlice,
  },
});
