import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});
